import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
//import { Usuario } from '../modeloUsuario';
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
    //return this.http.get('https://my-json-server.typicode.com/milasantacruz/miniback-jsonServer/user')
    this.usuario = this.http.get("http://localhost:8181/usuario/buscar/1")
    console.log(this.usuario)
    return this.usuario
  }
 
  // obtenerProyectos():Observable<any>
  // {
  //   console.log("obteniendo Proyectos...")
  //   return this.http.get('https://my-json-server.typicode.com/milasantacruz/miniback-jsonServer/proyectos')
  // }

  // obtenerEducacion():Observable<any>
  // {
  //   console.log("obteniendo Proyectos...")
  //   return this.http.get('https://my-json-server.typicode.com/milasantacruz/miniback-jsonServer/educacion')
  // }

}
