/**
 * File Name: login-controller.service.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers:
 *
 */

import { Injectable } from '@angular/core';
import { Controller } from '../controller.service';
import { LoginLog } from '../../../shared/Logs/LoginLog';
import { AuthService } from '../../security/auth/auth.service';
import { DatabaseManagerService } from '../../database/database-manager.service';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from './../../../routes.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// let's see if extends works as well as implements
export class LoginControllerService extends Controller {
  // tslint:disable-next-line: no-trailing-whitespace

  constructor(
    private router: Router, 
    private auth: AuthService, 
    private databaseManager: DatabaseManagerService,
    private http: HttpClient) {
    super();

    localStorage.setItem('signin', 'false');
  }

  protected log: LoginLog;

  /**
   * Method name: Signin()
   * Purpose: Sign in a user using the authentication service.
   */
  public signIn(): void {

    // get IP address and login attempt information
    let ip: string;
    this.http.get<{ip: string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('User IP (set): ' + data.ip);
      ip = data.ip;
    });
    const loginTry = { attemptTime: new Date(), context: 'loginController' };

    // create the adminIP and loginAttempt objects
    const loginAttempt = JSON.stringify(loginTry);

    // create a loginLog
    this.log = new LoginLog(ip, loginAttempt);

    // save the loginLog using the databaseManager
    this.databaseManager.saveLog(this.log);
    
    localStorage.setItem('signin', 'true');
    console.log('localstorage has been set to: ' + localStorage.getItem('signin'));
    // signin using the authenticationService
    this.auth.signIn();
  }

  public continueSignIn(): boolean {
    // ought to return boolean
    this.auth.processAuth();
    
    return true;
  }

  private resume(): string {
    
    console.log('on the right track');
    // get the loginLog using IP address
    let ip: string;
    this.http.get<{ip: string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('User IP (get): ' + data.ip);
      ip = data.ip;
    });

    // get loginLog from databaseManager
    this.log = this.databaseManager.getLog(ip, 'loginController') as LoginLog;

    // if the log is null in means that it's too old or nonexistant
    const tooOld = this.log === null ? true : false;

    if (tooOld) {
      this.auth.signOut();

      return 'IP Change or login timeout; please retry login.';
    }


    const loginSuccess = JSON.parse(JSON.stringify({ successTime: Date.now(), userId: this.auth.userProfile.user_id }));
    this.log.enterSuccess(loginSuccess);
    
    this.databaseManager.saveLog(this.log);

    // check for the session and the profile to get the route to redirect to; also
    // implement guards
    this.router.navigate([ROUTE_NAMES.HOME]);
    
    return 'done';
  }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated;
  }

  public signOut(): void {
    this.auth.signOut();
  }
}
