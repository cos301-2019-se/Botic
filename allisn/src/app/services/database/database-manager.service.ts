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
    
    switch (lg.context) {
      case 'loginController': {
          console.log('inside loginController case');
          const loginLog: LoginLog = lg as LoginLog;
          if (loginLog.getLoginIime()) {
            
            let resp: any;
            
            this.saveLog$({ 
              userIP: loginLog.getLoginIP(), 
              attemptTime: loginLog.getTimestamp(), 
              context: 'loginController', 
              successTime: loginLog.getLoginIime(), 
              userId: loginLog.getUserId()
            }).subscribe(
              data =>
              {
                resp = data;
              }
            );

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
        // console.log('inside default case');
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

  public getLog(id: string, comp: string): Log {
    // call database manager to obtain the log  
    
    let log: Log = null;
    let fetchedLog;
    this.getLog$({ userIP: id, context: comp }).subscribe(data => 
      {
        console.log(JSON.stringify(data.log));
        fetchedLog = JSON.parse(data.log);
        console.log(data.message);
      }
    );
    
    if (fetchedLog.context === 'loginController') {
      const loginAttempt = { timestamp: fetchedLog.attemptTime, context: 'loginController' };
      
      log = new LoginLog(fetchedLog.userIP, JSON.stringify(loginAttempt));
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
