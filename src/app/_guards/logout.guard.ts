import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> | boolean {
    console.log('Active guard');
    if (this.authService.getToken() !== null) {
      this.router.navigate(['/panel/myDate']);
      return false;
    }

    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    return false;
  }
}
