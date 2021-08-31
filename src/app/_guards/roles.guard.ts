import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "../_services/user.service";

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(
    public userService: UsersService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let admin = this.userService.isAdmin();

    if (admin) {
      return true;
    }

    this.router.navigate(['/panel/myDate']);

    return false;
  }

}
