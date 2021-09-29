import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingService } from "../_services/setting.service";

@Injectable({
  providedIn: 'root'
})
export class SettingGuard implements CanActivate {
  active: boolean = false;
  constructor(
    public settingService: SettingService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.settingService.getSetting('register').subscribe(x => {
      if (x.value == 1) {
        this.active = true
      }
    });

    if (this.active) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

}
