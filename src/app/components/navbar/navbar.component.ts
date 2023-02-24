import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

declare var window:any;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogIn:any;
  formModal:any;
  loginData={
    'email':'',
    'password':''
  }

  signInModal:any;
  signInData={
    'nombre':'',
    'email':'',
    'password':''
  }


  constructor(private router:Router,private userService:UserServiceService,private snack:MatSnackBar){}
  
  ngOnInit():void{
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("loginModal")
    );

    this.signInModal = new window.bootstrap.Modal(
      document.getElementById("signInModal")
    );

    this.islog();
  }

  islog(){
    if(this.userService.getToken()){
      this.isLogIn = true
    }else{
      this.isLogIn = false
    }
    console.log("from nav "+this.isLogIn)
  }

  openModalL(){
    this.formModal.show();
  }

  closeModalL(){
    this.formModal.hide();
  }
  openModalS(){
    this.signInModal.show();
  }

  closeModalS(){
    this.signInModal.hide();
    
  }
  formSubmitL(){
    console.log("inicio de session");
    console.log(this.loginData)
    if(this.loginData.email.trim()=='' || this.loginData.email.trim()==null ){
      this.snack.open('snack El email es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password.trim()==null ){
      this.snack.open('snack El password es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }

    
    this.userService.ingresoUsuario(this.loginData).subscribe(
      response =>{
        console.log(response);
        //alert("Bienvenido!")
        Swal.fire('Welcome', 'Inicio de session exitoso!', 'success')
        .then((res)=>{
          //this.router.navigate(['/']);  
          window.location.reload();
        })
        
        
      },(err)=>{
        
        console.log(err.message);
        //alert("El Usuario o la contrasena son invalidos")
        Swal.fire('Error', 'El email o el password son incorrectos', 'error')
      }
    )
  }

  formSubmitS(){
    console.log("registro enviado");
    console.log(this.signInData);

    if(this.signInData.nombre.trim()=='' || this.signInData.nombre.trim()==null ){
      this.snack.open('snack El Nombre es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }

    if(this.signInData.email.trim()=='' || this.signInData.email.trim()==null ){
      this.snack.open('snack El email es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }

    if(this.signInData.password.trim()=='' || this.signInData.password.trim()==null ){
      this.snack.open('snack El password es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }

    this.userService.registroUsuario(this.signInData).subscribe(
      response =>{
        console.log(response);
        //alert("Bienvenido!")
        Swal.fire('Welcome!', 'Usuario registrado con exito', 'success')
        .then((res)=>{
          window.location.reload();
        })
        
      },(err)=>{
        
        console.log(err);
        //alert("El Usuario o la contrasena son invalidos")
        Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error')
      }
    )
  }

  logOut(){
    this.userService.logOut();
    window.location.reload();
  }

  

  
}
