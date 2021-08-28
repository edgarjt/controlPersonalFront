import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
};

@Injectable()

export class RoleService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + 'api/';
  }

  getRoles(): Observable<any> {
    return this.http.get(this.url + 'roles/getRoles', httpOptions);
  }

  addUsers(params: any): Observable<any> {
    return this.http.post(this.url + 'users/addUser', params, httpOptions);
  }

}
