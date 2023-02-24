import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { EditUsuarioService } from 'src/app/services/edit-usuario.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {

  dataEducacion: any;
  isLogIn: any;
  addEdu: any;
  newEducacion = {
    'institucion': '',
    'titulo': '',
    'descripcion': '',
    'imagen': '',
    'inicio': '',
    'fin': ''
  }
  constructor(private datosEducacion: DataService,
    private userService: UserServiceService,
    private editUsuarioService: EditUsuarioService,
    private snack: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.datosEducacion.obtenerUsuario().subscribe(data => {
      this.dataEducacion = data.addEducacion
    })

    this.islog();
  }

  islog() {

    if (this.userService.getToken()) {
      this.isLogIn = true
    } else {
      this.isLogIn = false
    }
    console.log('from edu ' + this.isLogIn)
  }

  clickEdit() {
    console.log('edit usuario');
    this.addEdu = true;
  }

  closeEdit() {
    this.newEducacion = {
      'institucion': '',
      'titulo': '',
      'descripcion': '',
      'imagen': '',
      'inicio': '',
      'fin': ''
    }
    this.addEdu = false;
  }

  editForm() {
    if (this.newEducacion.institucion.trim() == '' || this.newEducacion.institucion.trim() == null) {
      this.snack.open('snack La institucion es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    if (this.newEducacion.titulo.trim() == '' || this.newEducacion.titulo.trim() == null) {
      this.snack.open('snack El titulo es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.newEducacion.inicio == '' || this.newEducacion.inicio == null) {
      this.snack.open('snack El inicio es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.newEducacion.fin == '' || this.newEducacion.fin == null) {
      this.snack.open('snack El fin es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.newEducacion.descripcion.trim() == '' || this.newEducacion.descripcion.trim() == null) {
      this.snack.open('snack El descripcion es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.newEducacion.imagen.trim() == '' || this.newEducacion.imagen.trim() == null) {
      this.snack.open('snack El imagen es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    console.log(this.newEducacion);
    this.submitForm();
  }

  async submitForm() {
    console.log("submitedNewEducacion");
    try {
      const response = await this.editUsuarioService.newEducacion(this.newEducacion).toPromise();
      await Swal.fire('ok', 'cambios realizados!', 'success');
      this.agregar(response);
      window.location.reload;
    }catch(err){
      console.log(err);
      await Swal.fire('Error', 'No se pudieron realizar los cambios', 'error');
    }

  }

  async agregar(num:any){
    try{
      const response = await this.editUsuarioService.agregarEducacion(num).toPromise();
      console.log(response);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
}
