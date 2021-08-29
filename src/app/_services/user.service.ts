import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
};

@Injectable()

export class UsersService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + 'api/';
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url + 'users/getUsers', httpOptions);
  }

  addUsers(params: any): Observable<any> {
    return this.http.post(this.url + 'users/addUser', params, httpOptions);
  }

  updateUsers(params: any): Observable<any> {
    return this.http.put(this.url + 'users/updateUser', params, httpOptions);
  }

}
