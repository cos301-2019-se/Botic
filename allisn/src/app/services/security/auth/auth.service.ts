import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';
import { ROUTE_NAMES } from 'src/app/routes.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //create Auth0 instance
  private auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE,
  });

  userProfile: any;

  //logged in state, for actions throughout the app
  isLoggedIn: boolean;
  loggedInBehavior = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor(private router: Router) {
    //have to use local storage at some point-- better than cookies?
    const localProfile = localStorage.getItem('profile');

    if (this.isValidToken) {
      this.userProfile = JSON.parse(localProfile);
      this.setLoggedIn(true);
    } else if (!this.isValidToken && localProfile) {
      this.logout();
    }
   }

   setLoggedIn(value: boolean) {
     this.loggedInBehavior.next(value);
     this.isLoggedIn = value;
   }

   login(redirect?: string) {
     const REDIRECT = redirect ? redirect : this.router.url;
     localStorage.setItem('authRedirect', REDIRECT);
     //authorize request with Auth0
     this.auth0.authorize();
   }

   processAuth() {
     console.log("Inside processAuth()");
     //if Auth0 hash parsed, get the profile
     this.auth0.parseHash((err, authResult) => {
       if (authResult && authResult.accessToken) {
         window.location.hash = '';
         this.getProfile(authResult);
       } else if (err) {
         this.clearRedirect();
         this.router.navigate([ROUTE_NAMES.HOME]);
         console.error(`Erro authenticating: ${err.error}`);
       }
     });
   }

   private getProfile(authResult) {
     //use the accessToken to retrieve the user's profile and to set a session
     this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
       if (profile) {
         this.setSession(authResult, profile);
         this.router.navigate([localStorage.getItem('authRedirect') || '/']);
         this.clearRedirect();
       } else if (err) {
         console.error(`Error authenticating: ${err.error}`);
       }
     });
   }

   private setSession(authResult, profile) {
     //save the session data and update the status for login
     const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
     
     //set the tokens and the expiration in localStorage
     localStorage.setItem('access_token', authResult.accessToken);
     localStorage.setItem('expires_at', expiresAt);
     localStorage.setItem('profile', JSON.stringify(profile));
     this.userProfile = profile;

     //update the login status of user
     this.setLoggedIn(true);
     // activate the chatbot; the code below redirects to chat
     this.router.navigate([ROUTE_NAMES.CHAT]);
   }

   private clearRedirect() {
     //remove the redirect that is stored in localStorage
     localStorage.removeItem('authRedirect');
   }

   logout() {
     // remove all auth items from localStorage
     localStorage.removeItem('access_token');
     localStorage.removeItem('profile');
     localStorage.removeItem('expires_at');
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
     const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
     return Date.now() < expiresAt;
   }
}
