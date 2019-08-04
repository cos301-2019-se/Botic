import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ROUTE_NAMES } from '../../../routes.config';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    public canActivate() {
        if (this.auth.isLoggedIn) {
            return true;
        }

        this.router.navigate([ROUTE_NAMES.HOME]);
        return false;
    }
}
