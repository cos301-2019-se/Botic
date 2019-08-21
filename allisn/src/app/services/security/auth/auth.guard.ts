import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isAuthenticated) {
            
            // check the profile and user scopes to see if they have permission to access each page.
            if (this.auth.jwtPayload.permissions == 'access:admin' && (state.url == '/admin')) {
                return true; 
            }
            if (this.auth.jwtPayload.permissions == 'access:repHome' && (state.url == '/repHome')) {
                return true;
            }
            if (this.auth.jwtPayload.permissions == 'access:chat' && (state.url == '/chat')) {
                return true;
            }
            
        }
        // save secure path to redirect to after
        // successful login and prompt to log in
        this.auth.storeAuthRedirect(state.url);
        this.auth.signIn();
        return false;
    }
}
