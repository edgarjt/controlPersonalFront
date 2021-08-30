import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
};

@Injectable()

export class WorkService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + 'api/';
  }

  getWork(): Observable<any> {
    return this.http.get(this.url + 'work/getWorks', httpOptions);
  }

  addWork(params: any): Observable<any> {
    return this.http.post(this.url + 'work/addWork', params, httpOptions);
  }

  updateWork(params: any): Observable<any> {
    return this.http.put(this.url + 'work/updateWork', params, httpOptions);
  }

  deleteWork(params: any): Observable<any> {
    return this.http.delete(this.url + 'work/deleteWork?id=' + params.id, httpOptions);
  }

}
