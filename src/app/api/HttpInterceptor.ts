import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpEvent } from '@angular/common/http';

@Injectable()
export class APIHttpInterceptor implements HttpInterceptor {
  ms_user: String = '';
  constructor (protected localStorage: LocalStorage) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO check local storage
    const url = 'http://back.mediastorage.test/api';
    const uuid = window.localStorage.getItem('user');
    console.log('uuid=', uuid);

    req = req.clone({
      url: url + req.url,
      headers: req.headers.set('MSUser', uuid ? uuid.toString() : '')
    });

    return next.handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.ms_user = event.headers.get('MSUser');
          if (this.ms_user !== null) {
            window.localStorage.setItem('user', this.ms_user.toString());
          }
        }
      })
      .catch(err => {
        console.log('Caught error', err);
        return Observable.throw(err);
      });
  }
}
