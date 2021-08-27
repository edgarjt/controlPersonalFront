import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Header intercept');
    const token: String = this.authService.getToken();
    const authHeader = 'Bearer ' + token;
    let req = request;

    if (token !== null && token !== undefined) {
      req = request.clone( {
        setHeaders: {
          'Accept': 'application/json',
          'Authorization': authHeader
        }
      });
    }

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err:any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/login']);
          return;
        }
      }
    }));
  }

}
