import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
};

@Injectable()

export class AuthService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + 'api/auth/';
  }

  login(params: any): Observable <any> {
    return this.http.post(this.url + 'login', params, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(this.url + 'logout', httpOptions);
  }

  refreshToken(): Observable<any> {
    return this.http.post(this.url + 'refresh', httpOptions);
  }

  public storeToken(token: string): void{
    sessionStorage.setItem('token', token);
  }

  public storeUserData(userData: any){
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  public getToken(): any {
    return sessionStorage.getItem('token');
  }

  public getUsers():any {
    return JSON.parse(<any>sessionStorage.getItem('userData'));
  }

  public clearSessionStorage(): void{
    sessionStorage.clear();
  }

}
