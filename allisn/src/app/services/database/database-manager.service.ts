/**
 * File Name: database-manager.service.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers: 
 * 
 */

/**
 * Purpose  :  This is service is an interface to the database-manager API. It is meant to decouple all
 *              interfacing issues from all use case controllers that use any database in some way.
 */


import { Injectable } from '@angular/core';
import { Log } from '../../shared/Logs/Log';
import { LoginLog} from '../../shared/Logs/LoginLog';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  constructor() { }

  // enclose in try catch and do make way for error handling
  public saveLog(lg: Log): void {
    // call database manager and save the log
  }

  public getLog(iD: JSON): Log {
    // call database manager to obtain the log
    return new LoginLog(null, null);
  }
}
