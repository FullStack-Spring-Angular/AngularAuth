import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.userAuthService.getToken();

    if (token !== null) {
      const isTokenExpired = this.checkTokenExpiration(token);

      if (isTokenExpired) {
        this.userAuthService.clear();
        this.toastrService.info('Su sesión ha caducado','Información'); 
        this.router.navigate(['/login']);
        return false;
      }

      const role = route.data['roles'] as Array<string>;

      if (role) {
        const match = this.userService.roleMatch(role);

        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  checkTokenExpiration(token: string): boolean {
    const expirationDate = this.userAuthService.getTokenExpiration();
    const currentDate = new Date();

    return currentDate > expirationDate;
  }
}
