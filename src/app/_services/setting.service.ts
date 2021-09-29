import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {isObject} from "rxjs/internal-compatibility";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} ),
};

@Injectable()

export class SettingService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + 'api/';
  }

  getSetting(data: string): Observable<any> {
    return this.http.get(this.url + 'getSetting/' + data, httpOptions);
  }

  updateSetting(params: any): Observable<any> {
    return this.http.post(this.url + 'setting/updateSetting', params, httpOptions);
  }

}
