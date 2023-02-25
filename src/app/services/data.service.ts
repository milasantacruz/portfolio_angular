import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import baseUrl from './helper'
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  usuario:any
  constructor(private http:HttpClient, private userService:UserServiceService) { }

  obtenerUsuario():Observable<any>
  {
    console.log("obteniendo Usuario...")
    this.usuario = this.http.get(`${baseUrl}/usuario/buscar/1`)
    console.log(this.usuario)
    return this.usuario
  }

}
