import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getToken();
    if(token){
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(cloned);
            
    }
    return next.handle(request);
  }
}
