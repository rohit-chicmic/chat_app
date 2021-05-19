import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (this.isAuthenticated())
      return true;
    return false;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    // Check whether the token is expired and return
    // true or false
    if (!token) {
      console.log('Please login first');  
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
