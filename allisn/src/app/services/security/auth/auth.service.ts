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
import { BehaviorSubject } from 'rxjs';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';
import { ROUTE_NAMES } from '../../../routes.config';
import { Session } from '../../../shared/Session/Session';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // create Auth0 instance
  private auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE,
  });

  public userProfile: any;
  private session: Session;

  // logged in state, for actions throughout the app
  public isLoggedIn: boolean;
  public loggedInBehavior = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor(private router: Router) {
      // have to use local storage at some point-- better than cookies?
      const localProfile = localStorage.getItem('profile');

      if (this.isValidToken) {
        this.userProfile = JSON.parse(localProfile);
        this.setLoggedIn(true);
      } else if (!this.isValidToken && localProfile) {
        this.signOut();
      }
  }

  public setLoggedIn(value: boolean) {
    this.loggedInBehavior.next(value);
    this.isLoggedIn = value;
  }

  public signIn(redirect?: string): void {
    const REDIRECT = redirect ? redirect : this.router.url;
    localStorage.setItem('authRedirect', REDIRECT);
    // authorize request with Auth0
    this.auth0.authorize();
  }

  public processAuth(): void {
    console.log('Inside processAuth()');
    // if Auth0 hash parsed, get the profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        this.clearRedirect();
        this.router.navigate([ROUTE_NAMES.HOME]);
        console.error(`Erro authenticating: ${err.error}`);
      }
    });
  }

  // tslint:disable-next-line: naming-convention
  private getUserInfo(authResult): void {
    // use the accessToken to retrieve the user's profile and to set a session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.startSession(authResult.accessToken, profile);
        // this redirect seems reduntant
        this.router.navigate([localStorage.getItem('authRedirect') || '/']);
        this.clearRedirect();
      } else if (err) {
        // this is not correct error handling
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  // tslint:disable-next-line: naming-convention
  private startSession(authResult, profile): void {
    
    this.session = new Session();
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    this.session.startSession(authResult.accessToken, expiresAt, profile);

    this.userProfile = profile;

    // update the login status of user
    this.setLoggedIn(true);
    // activate the chatbot; the code below redirects to chat
    // depending on the data in the profile we can redirect to different pages
  // all we have to do now is block the routes.
    
    this.router.navigate([ROUTE_NAMES.CHAT]);
  }

  private clearRedirect() {
    // remove the redirect that is stored in localStorage
    localStorage.removeItem('authRedirect');
  }

  public signOut(): void {
    // remove all auth items from localStorage
    // endSession()

    this.session.endSession();
    
    localStorage.removeItem('authRedirect');
    this.clearRedirect();

    // reset local properties and update the logged in status
    this.userProfile = undefined;
    this.setLoggedIn(false);

    // redirect to homepage
    this.router.navigate([ROUTE_NAMES.HOME]);
  }

  get isValidToken(): boolean {
    // check if the access token hasn't expired
    
    const expiresAt = (this.session !== null) ? this.session.getExpiresAt() : (this.session = new Session()).getExpiresAt();

    return Date.now() < expiresAt;
  }
}
