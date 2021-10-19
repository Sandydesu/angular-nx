import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const req = request.clone({
      headers: headers,
      params: request.params.set(
        'key',
        'AIzaSyA7k_rdmGWL0NZE38Y0WvndZmY9_etPs_Y'
      ),
    });
    return next.handle(req);
  }
}
