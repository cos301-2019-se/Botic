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

@Injectable({
  providedIn: 'root'
})
// let's see if extends works as well as implements
export class LoginControllerService extends Controller {
  // tslint:disable-next-line: no-trailing-whitespace

  constructor(private router: Router) {
    super();
    this.databaseManager = new DatabaseManagerService();
    this.auth = new AuthService(router);
  }

  // tslint:disable-next-line: naming-convention
  private databaseManager: DatabaseManagerService;
  // tslint:disable-next-line: naming-convention
  private auth: AuthService;

  // tslint:disable-next-line: naming-convention
  private log: LoginLog;

  /**
   * Method name: Signin()
   * Purpose: Sign in a user using the authentication service.
   */
  public signIn(): void {
    // get IP address and login attempt information
    const ip = 'values';
    const loginTry = '{ "date" : "4 July"}';

    // create the adminIP and loginAttempt objects
    const userIP = JSON.parse(ip);
    const loginAttempt = JSON.parse(loginTry);

    // create a loginLog
    this.log = new LoginLog(userIP, loginAttempt);

    // save the loginLog using the databaseManager
    this.databaseManager.saveLog(this.log);

    // signin using the authenticationService
    this.auth.signIn();
    return null;
  }

  public continueSignIn(): string {
    // ought to return boolean
    this.auth.processAuth();

    // get the loginLog using IP address
    const ip = 'value';

    // create object
    const userIP = JSON.parse(ip);

    // get loginLog from databaseManager
    this.log = this.databaseManager.getLog(userIP);

    // Boolean tooOld = new Boolean(this.log.date < Date.now());
    const tooOld = false;
    if (this.log === null || tooOld) {
      this.auth.signOut();

      if (this.log === null) {
        return 'IP Change detected, please retry login.';
      } else {
        return 'Login took too long, retry';
      }
    }

    const loginSuccess = JSON.parse('{ time: Date.now() }');
    // pretend this works
    this.log.enterSuccess(loginSuccess);
    
    this.databaseManager.saveLog(this.log);

    // check for the session and the profile to get the route to redirect to; also
    // implement guards
    this.router.navigate([ROUTE_NAMES.HOME]);
    
    return null;
  }
}
