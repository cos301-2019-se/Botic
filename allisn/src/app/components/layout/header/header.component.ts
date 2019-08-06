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
import { AuthService } from '../../../services/security/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public username: string;

  public ngOnInit() {
  }

  public logout() {
    //call the login controller
    //this.auth.logout();
  }

  /**
   * Method name:   Login()
   * Purpose:       Log a user into the system. This method uses the loginController.
   */
  public login() {
    //a call to the login controller
    //this.auth.login();
  }


}
