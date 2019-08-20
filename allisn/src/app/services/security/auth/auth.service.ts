/**
 * File Name: auth.service.ts
 * Version number: v2
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers: 
 * 
 */

/**
 * Purpose  :  This is service is an interface to the Authentication Service Auth0.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, bindNodeCallback, timer, of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { Session } from '../../../shared/Session/Session';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // create Auth0 instance
  // tslint:disable-next-line: naming-convention
  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientId,
    domain: environment.auth.domain,
    responseType: 'token id_token',
    redirectUri: environment.auth.redirect,
    audience: 'botic-frontend.herokuapp.com/chat',
    scope: 'openid email read:messages send:messages', // these will be updated during development
  });

  // localStorage property names
  private authFlag = 'isLoggedIn';
  private redirect = 'redirect';
  // store access token and create stream
  accessToken: string = null;
  accessToken$ = new BehaviorSubject<string>(this.accessToken);
  // create stream of user profile data
  userProfile: any = null;
  userProfile$ = new BehaviorSubject<any>(this.userProfile);
  // Auth-related URL paths
  logoutPath = '/';
  defaultSuccessPath = '/';
  // create observable of Auth0 parseHarsh method; gather auth results
  parseHash$ = bindNodeCallback(this.auth0.parseHash.bind(this.auth0));
  // create observable of auth0 checkSession method to verify authorization server session and renew tokens
  checkSession$ = bindNodeCallback(this.auth0.checkSession.bind(this.auth0));
  // token expiration management
  accessTokenExp: number;
  refreshSub: Subscription;
  // hide auth header while performing local login (e.g. on the callback page)
  hideAuthHeader: boolean;

  // tslint:disable-next-line: naming-convention
  private session: Session;

  constructor(private router: Router, private location: Location) {}

  public signIn(autoLogin?: boolean): void {
    // was signIn triggered by user accessing guarded route?
    if (!autoLogin) {
      // if the user clicked the login button, store the path to redirect to after successful login
      this.storeAuthRedirect(this.router.url);
      // if the login was triggered by an access attempt instead, the route guard will set redirect
    }
    this.auth0.authorize();
  }

  public processAuth(): void | boolean {
    if (window.location.hash && !this.isAuthenticated) {
      // hide header while parsing hash
      this.hideAuthHeader = true;
      // subscribe to parseHash$ bound callback observable
      this.parseHash$({}).subscribe(
        authResult => {
          // don't keep callback route + hash in browser history
          this.location.replaceState('/');
          // log in locally and navigate
          this.localLogin(authResult);
          this.navigateAfterParseHash();
        },
        err => this.handleError(err)
      );
      return true;
    } else {
      // if visiting the page with no hash, return to the default logged out route
      // this.goToLogoutUrl();
      return false;
    }
  }

  private renewAuth(): void {
    if (this.isAuthenticated) {
      // check auth0 authorization server session
      this.checkSession$({}).subscribe(
        authResult => this.localLogin(authResult),
        err => this.handleError(err)
      );
    }
  }

  private localLogin(authResult): void {
    if (authResult && authResult.accessToken && authResult.idToken && authResult.idTokenPayload) {
      // set token expiration
      const now = new Date().getTime();
      this.accessTokenExp = now + (authResult.expiresIn * 1000);
      // set token in local property and emit in stream
      this.setToken(authResult.accessToken);
      // emit value for user profile stream
      this.userProfile = authResult.idTokenPayload;
      this.userProfile$.next(this.userProfile);
      // set flag in local storage statig app is loggin in
      localStorage.setItem(this.authFlag, JSON.stringify(true));
      // set up silent token renewal for this browser session
      this.scheduleRenewal();

      // store everything in localstorage so that it is accessible to other controllers
      this.session = new Session();
      this.session.startSession(authResult.accessToken, JSON.stringify(this.accessTokenExp), this.userProfile);

    } else {
      // if something was missing from the expected authResult
      this.localLogout(true);
    }
  }

  private localLogout(redirect?: boolean): void {
    this.userProfile$.next(null);
    this.setToken(null);
    this.unscheduleRenewal();
    this.clearRedirect();
    localStorage.setItem(this.authFlag, JSON.stringify(false));

    // clear everything stored in localstorage
    if (this.session) {
      this.session.endSession();
      this.session = null;
    } else {
      (this.session = new Session()).endSession();
      this.session = null;
    }

    // redirect back to logout URL (if param set)
    if (redirect) {
      this.goToLogoutUrl();
    }
  }

  public signOut(): void {
    this.localLogout();
    
    // auth0 server logout does a full page redirect: makes sure to have full logout URL in Auth0
    // dashboard application settings in allowed logout URLs
    this.auth0.logout({
      returnTo: environment.auth.logoutUrl,
      clientID: environment.auth.clientId
    });
  }

  private scheduleRenewal(): void {
    if (!this.isAuthenticated) { return;}
    // cleanup previous token renewal
    this.unscheduleRenewal();
    // create and subscribe to expiration timer observable
    const expiresIn$ = of(this.accessTokenExp).pipe(
      mergeMap(exp => timer(Math.max(1, exp - Date.now())))
    );
    this.refreshSub = expiresIn$.subscribe(
      () => this.renewAuth()
    );
  }

  private unscheduleRenewal(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  private handleError(err): void {
    this.hideAuthHeader = false;
    console.error(err);
    // log out locally and redirect to default auth failure route
    this.localLogout(true);
  }

  get isAuthenticated(): boolean {
    // check if the angular app thinks this user is authenticated
    return JSON.parse(localStorage.getItem(this.authFlag));
  }

  private setToken(token: string): void {
    this.accessToken = token;
    this.accessToken$.next(token);
  }

  private navigateAfterParseHash(): void {
    const rd = localStorage.getItem(this.redirect);
    if (rd) {
      this.router.navigateByUrl(rd).then(
        navigated => {
          if (navigated) {
            this.hideAuthHeader = false;
          }
          this.clearRedirect();
        }
      );
    } else {
      this.clearRedirect();
      this.router.navigateByUrl(this.defaultSuccessPath);
    }
  }

  public storeAuthRedirect(url: string): void {
    localStorage.setItem(this.redirect, url);
  }

  private clearRedirect(): void {
    localStorage.removeItem(this.redirect);
  }

  private goToLogoutUrl(): void {
    this.router.navigate([this.logoutPath]);
  }

  private userHasRole(reqRole: string): boolean {
    return this.userProfile[environment.auth.roles_namespace].indexOf(reqRole) > -1;
  }
}
