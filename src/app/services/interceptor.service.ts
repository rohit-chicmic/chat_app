import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  requestCount = 0;
  constructor(
    public router: Router
  ) { }

  /** Request interceptor **/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    // Clone the request to add the new header.
    const token = localStorage.getItem("accessToken");
    if (token) {
      req = req.clone({
        headers: req.headers.set("authorization", token)
      });
    }
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        
      }
    },
      async (err: any) => {
      }));
  }
}