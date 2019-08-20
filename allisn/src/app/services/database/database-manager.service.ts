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
import { throwError, Observable } from 'rxjs';
// tslint:disable: no-submodule-imports
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Log } from '../../shared/Logs/Log';
import { LoginLog} from '../../shared/Logs/LoginLog';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  constructor(private http: HttpClient) { }

  // enclose in try catch and do make way for error handling
  public saveLog(lg: Log): void {
    // prepare a call to the databaseManager in the persistence layer
    console.log('databaseManager saveLog');
    console.log('context ' + lg.context);
    switch (lg.context) {
      case 'loginController': {
          console.log('inside loginController case');
          const loginLog: LoginLog = lg as LoginLog;
          if (loginLog.getLoginIime()) {
            
            let resp = this.saveLog$({ 
              userIP: loginLog.getLoginIP(), 
              attemptTime: loginLog.getTimestamp(), 
              context: 'loginController', 
              successTime: loginLog.getLoginIime(), 
              userId: loginLog.getUserId()
            });

            console.log('resp ' + resp);
          } else {

            let resp: any;
            
            this.saveLog$({ 
              userIP: loginLog.getLoginIP(), 
              attemptTime: loginLog.getTimestamp(), 
              context: 'loginController' 
            }).subscribe(
              data =>
              {
                resp = data;  
              }
            );
            console.log('resp: ' + JSON.stringify(resp));
          }
        }
        break;
      default: {
        // just exit: do nothing
        console.log('inside default case');
      }
    }
  }

  protected saveLog$(log: any): Observable<any> {
    console.log('saveLog$ is called');
    return this.http
    .post(`${environment.databaseManager.baseUrl}saveLog`, log)
    .pipe(
      tap(res => console.log(res)),
      catchError(err => throwError(err))
    );
  }

  public getLog(id: string, component: string): Log {
    // call database manager to obtain the log  
    
    let log: Log = null;
    let fetchedLog;
    this.getLog$({ identifier: id, component: component }).subscribe(data => (
      fetchedLog = JSON.parse(data)
    ));
    
    fetchedLog = JSON.parse(fetchedLog);
    if (fetchedLog.log.context === 'loginController') {
      const loginAttempt = { timestamp: fetchedLog.log.attemptTime, context: fetchedLog.log.context };
      
      log = new LoginLog(fetchedLog.log.userIP, JSON.stringify(loginAttempt));
    }

    return log;
  }

  protected getLog$(id: any): Observable<any> {
    
    return this.http
    .get(`${environment.databaseManager.baseUrl}getLog`, id)
    .pipe(
      tap(res => console.log('Log obtained!')),
      catchError(err => throwError(err))
    );

  }
  
}
