import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, UserModel } from '../constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  loginUser(data) {
    return this.httpService.postData(API_URL.LOGIN, data);
  }

  registerUser(data) {
    return this.httpService.postData(API_URL.REGISTER, data);
  }

  getCurrentUser(): Observable<UserModel> {
    return JSON.parse(localStorage.getItem('data'));
  }

  getAllUsers(): Observable<any>{
    return this.httpService.getData(API_URL.GET_USER)
  }

  uploadAvatar(data){
    return this.httpService.postData(API_URL.AVATAR, data);
  }
}
