/**
 * File Name: secure-interceptor.service.ts
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
 * Purpose  :  This is service intercepts all http requests sent throughout this layer and adds the relevant
 *             authentication, in the form of a JWT. 
 */

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { filter, mergeMap, catchError } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';


@Injectable({
  providedIn: 'root'
})
export class SecureInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }
  private jwtSecret = 'D!MN';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('secure-interceptor');
    if (req.body) {
      if (req.body.context === 'loginController') {
        // create a JWT
        const { subsystem, component } = { subsystem: 'frontend', component: 'loginController' };
        const newToken = jwt.sign({ subsystem, component }, this.jwtSecret, {
          expiresIn: '1h',
        });

        // attach token to request header
        const tokenReq = req.clone({
          setHeaders: { Authorization: newToken }
        });

        // send the req through with token
        return next.handle(tokenReq);
      }
    }
    return next.handle(req);
  }
}
