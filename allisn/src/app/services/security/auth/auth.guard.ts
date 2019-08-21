/**
 * File Name: auth.guard.ts
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
 * Purpose  :  This is a guard; it prevents unauthorized users from accessing protected pages by using the role
 *             data included in the decoded JWTs.
 */


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    public canActivate(
        next: ActivatedRouteSnapshot, // the next route that will be activated if the guard is allowing access
        state: RouterStateSnapshot // the next router state if the guard is allowing access
    ): Observable<boolean> | Promise<boolean> | boolean {
        
        if (this.auth.isAuthenticated) {
            
            // check the profile and user scopes to see if they have permission to access each page.
            const decodedToken = this.auth.decodedAccessToken;
            if (decodedToken.permissions == 'access:admin' && (state.url == '/admin')) {
                return true;
            }
            
            if (decodedToken.permissions == 'access:admin' && (next.url.join('') != '/admin')) {
                this.router.navigateByUrl('/');
                return false;
            }

            if (decodedToken.permissions == 'access:repHome' && (state.url == '/repHome')) {
                return true;
            }

            if (decodedToken.permissions == 'access:repHome' && (next.url.join('') != '/repHome')) {
                this.router.navigateByUrl('/');
                return false;
            }

            /*
                if (decodedToken.permissions == 'access:chat') {
                    return true;
                }
            */
            
        } else if (!this.auth.isAuthenticated) {
            // save secure path to redirect to after
            // successful login and prompt to log in
            this.auth.storeAuthRedirect(state.url);
            this.auth.signIn();
            return false;
        }

        this.router.navigateByUrl('/');
        return false;
    }
}
