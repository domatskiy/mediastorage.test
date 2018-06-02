import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';

@Injectable()
export class APIHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://back.mediastorage.test/api';
      req = req.clone({
        url: url + req.url
    });
    return next.handle(req);
  }
}
