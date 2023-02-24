import { HttpClient,HttpResponse, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import baseUrl from './helper'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService  implements HttpInterceptor  {

  constructor(private httpClient:HttpClient) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const corsReq = req.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
    return next.handle(corsReq);
  }
  public ingresoUsuario(user:any){
    return this.httpClient.post(`${baseUrl}/login`, user,{
      observe:'response'
    }).pipe(map((response:HttpResponse<any>)=>{
      const body = response.body
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken?.replace('Bearer ','');
      if(token){
        localStorage.setItem('token',token);
        //console.log(response)
      }
      return body
    }))
  }

  public logOut(){
    return localStorage.clear();
  }

  public registroUsuario(user:any){
    return this.httpClient.post(`${baseUrl}/usuario/new`, user)
    
  }

  public getToken(){
    return localStorage.getItem('token');
  }
}
