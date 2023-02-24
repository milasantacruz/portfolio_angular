import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Educacion } from 'src/app/models/educacion';
import { EditUsuarioService } from 'src/app/services/edit-usuario.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css']
})
export class EducacionItemComponent {

  @Input() educacion: any;
  isLogIn:any;
  editEdu:any;
  editedEdu:any;
  constructor(private userService:UserServiceService,
    private editUsuarioService:EditUsuarioService,
    private snack:MatSnackBar
    ){}

  ngOnInit(): void{
    this.islog();
    this.editedEdu = new Educacion(
      this.educacion.id,
      this.educacion.institucion,
      this.educacion.titulo,
      this.educacion.descripcion,
      this.educacion.imagen,
      this.educacion.inicio,
      this.educacion.fin
    )
  }

  islog(){
    
    if(this.userService.getToken()){
      this.isLogIn = true;
    }else{
      this.isLogIn = false;
    }
    console.log("from edu-item " + this.isLogIn);
  }

  clickEdit(){
    console.log("edit usuario");
    this.editEdu = true;
  }

  closeEdit(){
    this.editedEdu = new Educacion(
      this.educacion.id,
      this.educacion.institucion,
      this.educacion.titulo,
      this.educacion.descripcion,
      this.educacion.imagen,
      this.educacion.inicio,
      this.educacion.fin
    )
    this.editEdu = false;
  }

  editForm(){
    if (this.editedEdu.institucion.trim() == '' || this.editedEdu.institucion.trim() == null) {
      this.snack.open('snack El nombre de la empresa es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    if (this.editedEdu.titulo.trim() == '' || this.editedEdu.titulo.trim() == null) {
      this.snack.open('snack El Nombre es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    if (this.editedEdu.descripcion.trim() == '' || this.editedEdu.descripcion.trim() == null) {
      this.snack.open('snack El cargo es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.editedEdu.inicio == '' || this.editedEdu.inicio == null) {
      this.snack.open('snack El inicio es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
   if (this.editedEdu.fin == '' || this.editedEdu.fin == null) {
      this.snack.open('snack El fin es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.editedEdu.imagen.trim() == '' || this.editedEdu.imagen.trim() == null) {
      this.snack.open('snack El imagen es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    console.log(this.editedEdu);
    this.submitForm();
  }

  async submitForm(){
    console.log("submitedEduEditForm");
    try{
      const response = await this.editUsuarioService.editarEducacion(this.editedEdu).toPromise();
      console.log(response);
      await Swal.fire('ok', 'Cambios realizados con exito!', 'success');
      window.location.reload();
    }catch(err){
      console.log(err);
      await Swal.fire('Error', 'No se pudieron realizar los cambios', 'error');
    }
  }
}
