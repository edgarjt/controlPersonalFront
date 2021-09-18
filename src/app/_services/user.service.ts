import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from "./auth.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
};

@Injectable()

export class UsersService {
  public url: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.url = environment.API_URL + 'api/';
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url + 'users/getUsers', httpOptions);
  }

  addUsers(params: any): Observable<any> {
    return this.http.post(this.url + 'users/addUser', params, httpOptions);
  }

  addUsersGeneral(params: any): Observable<any> {
    return this.http.post(this.url + 'addUserGeneral', params, httpOptions);
  }

  updateUsers(params: any): Observable<any> {
    return this.http.put(this.url + 'users/updateUser', params, httpOptions);
  }

  deleteUser(params: any): Observable<any> {
    return this.http.delete(this.url + 'users/deleteUser?id=' + params.id, httpOptions);
  }

  isAdmin(): boolean {
    let data = this.authService.getUsers();

    if(data === undefined || data === null)
      return false

    return data.role.code === 'admin';

  }

  isUser(): boolean {
    let data = this.authService.getUsers();

    if (data === undefined || data === null)
      return false;

    return data.role.code === 'user';
  }

}
