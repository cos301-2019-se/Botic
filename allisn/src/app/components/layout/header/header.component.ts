/**
 * File Name: header.component.ts
 * Version number:
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers: 
 * 
 */

import { Component, OnInit } from '@angular/core';
import { LoginControllerService } from '../../../services/controllers/login/login-controller.service';
import { AuthService } from '../../../services/security/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // won't need to make a new one...just take from the main component
  constructor(public loginController: LoginControllerService) {
    
  }

  public username: string;

  // tslint:disable-next-line: typedef
  public ngOnInit() {
    this.loginController.continueSignIn();
  }

  public logout(): void {
    // call the login controller
    this.loginController.signOut();
  }

  /**
   * Method name:   Login()
   * Purpose:       Log a user into the system. This method uses the loginController.
   */
  public login(): void {
    // a call to the login controller
    this.loginController.signIn();
  }


}
