import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { DataService } from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
//import { AuthGuard } from 'src/app/helpers/auth.guard';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EditUsuarioService } from 'src/app/services/edit-usuario.service';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuarioDataModel:any;
  isLogIn:any;
  editUsuario:any;

    // This is the option that uses the package's AnimationOption interface  
    options: AnimationOptions = {    
      path: 'https://assets9.lottiefiles.com/packages/lf20_wToGI28NVx.json' ,
      loop:false 
    };  
  
  constructor(private datosPortfolio:DataService,
    private userService:UserServiceService,
    private editUsuarioService:EditUsuarioService,
    private snack:MatSnackBar
    ){

  }

  ngOnInit(): void{
    this.datosPortfolio.obtenerUsuario().subscribe(data => {
      console.log(data)
      
      this.usuarioDataModel = new Usuario(
        data.id,
        data.addEducacion,
        data.addProyecto,
        data.nombre,
        data.email,
        data.password,
        data.imagen_perfil,
        data.imagen_bg,
        data.fecha_nacimiento,
        data.ocupacion,
        data.sobre_mi);

        console.log(this.usuarioDataModel);
    });

    this.islog()
   
  }

  islog(){
    
    if(this.userService.getToken()){
      this.isLogIn = true
    }else{
      this.isLogIn = false
    }
    console.log(this.isLogIn)
  }

  clickEdit(){
    console.log("edit usuario");
    this.editUsuario = true;
  }

  closeEdit(){
    this.editUsuario = false;
  }

  editForm(){
    if(this.usuarioDataModel.ocupacion.trim()=='' || this.usuarioDataModel.ocupacion.trim()==null ){
      this.snack.open('snack El titulo es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }

    if(this.usuarioDataModel.nombre.trim()=='' || this.usuarioDataModel.nombre.trim()==null ){
      this.snack.open('snack El nombre es requerido','Aceptar',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass:'mysnack'
      })
      return;
    }
    console.log(this.usuarioDataModel)
    this.submitEditForm();
  }
  
  submitEditForm(){
    console.log(this.usuarioDataModel);
    this.editUsuarioService.editUsuario(this.usuarioDataModel).subscribe(
      response =>{
        console.log(response);
        //alert("Bienvenido!")
        Swal.fire('ok', 'cambios ralizados!', 'success')
        .then((res)=>{
          window.location.reload();
        })
        
        
      },(err)=>{
        
        console.log(err.message);
        //alert("El Usuario o la contrasena son invalidos")
        Swal.fire('Error', 'No se pudieron realizar los cambios', 'error')
      }
    )

  }
  

   // This is the component function that binds to the animationCreated event from the package  
   onAnimate(animationItem:AnimationItem): void {    
    console.log(animationItem);  
  }

}
