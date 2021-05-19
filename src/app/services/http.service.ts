import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(URL, data){
    return this.http.post<any>(`${BaseUrl}${URL}`, data);
  }

  getData(URL){
    return this.http.get(`${BaseUrl}${URL}`);
  }

}
