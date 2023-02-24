import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper'
@Injectable({
  providedIn: 'root'
})
export class EditUsuarioService {

  constructor(private httpClient: HttpClient) { }
//USUARIO
  public editUsuario(user: any) {
    return this.httpClient.post(`${baseUrl}/usuario/edit`, user)

  }
//PROYECTOS
  public newLabor(labor: any) {
 
    return this.httpClient.post(`${baseUrl}/proyecto/new`, labor);
      
  }

  public listarProyectos(){
    return this.httpClient.get(`${baseUrl}/proyecto/ver`);
  }
  
  public agregarLabor(laborId: any) {
    return this.httpClient.put(`${baseUrl}/proyecto/1/proyecto/` + `${laborId}`, laborId)
  }

  public editProyecto(proyecto:any){
    return this.httpClient.put(`${baseUrl}/proyecto/edit`,proyecto);
  }
//CLIENTE
  public consultarClientes() {
    return this.httpClient.get(`${baseUrl}/cliente/ver`)
  }

  public  nuevoCliente(cliente:any){
    return this.httpClient.post(`${baseUrl}/cliente/new`, cliente);
  }

  public addClienteToProyecto(proyectoId:any, clienteId:any){
    return this.httpClient.put(`${baseUrl}/cliente/${proyectoId}/cliente/${clienteId}`, {});
  }

  //EDUCAION

  public newEducacion(educacion:any){
    return this.httpClient.post(`${baseUrl}/educacion/new`,educacion);
  }

  public agregarEducacion(eduId:any){
    return this.httpClient.put(`${baseUrl}/usuario/1/educacion/`+ `${eduId}`, eduId );
  }

  public editarEducacion(edu:any){
    return this.httpClient.post(`${baseUrl}/educacion/edit`,edu);
  }

}
