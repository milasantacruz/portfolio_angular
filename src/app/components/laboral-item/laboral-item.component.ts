import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proyecto } from 'src/app/models/proyecto';
import { EditUsuarioService } from 'src/app/services/edit-usuario.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'laboral-item',
  templateUrl: './laboral-item.component.html',
  styleUrls: ['./laboral-item.component.css']
})
export class LaboralItemComponent {

  @Input() labor: any
  isLogIn:any;
  editLabor:any;
  editedLabor:any;

  constructor(private userService:UserServiceService,
    private editUsuarioService:EditUsuarioService,
    private snack:MatSnackBar
    ){

  }

  ngOnInit(): void{
    this.islog()

   this.editedLabor = new Proyecto(
      this.labor.id,
      this.labor.addCliente,
      this.labor.addTecnologia,
      this.labor.nombre,
      this.labor.cargo,
      this.labor.descripcion,
      this.labor.imagen,
      this.labor.inicio,
      this.labor.fin,
    )
  }

  islog(){
    
    if(this.userService.getToken()){
      this.isLogIn = true
    }else{
      this.isLogIn = false
    }
    console.log("from labor"+this.isLogIn)
  }

  clickEdit(){
    console.log("edit usuario");
    this.editLabor = true;
  }

  closeEdit(){
    this.editedLabor = new Proyecto(
      this.labor.id,
      this.labor.addCliente,
      this.labor.addTecnologia,
      this.labor.nombre,
      this.labor.cargo,
      this.labor.descripcion,
      this.labor.imagen,
      this.labor.inicio,
      this.labor.fin,
    )
    this.editLabor = false;
  }
  editForm() {
    if (this.editedLabor.addCliente[0].nombre.trim() == '' || this.editedLabor.addCliente[0].nombre.trim() == null) {
      this.snack.open('snack El nombre de la empresa es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    if (this.editedLabor.nombre.trim() == '' || this.editedLabor.nombre.trim() == null) {
      this.snack.open('snack El Nombre es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    if (this.editedLabor.cargo.trim() == '' || this.editedLabor.cargo.trim() == null) {
      this.snack.open('snack El cargo es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.editedLabor.inicio == '' || this.editedLabor.inicio == null) {
      this.snack.open('snack El inicio es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
   if (this.editedLabor.fin == '' || this.editedLabor.fin == null) {
      this.snack.open('snack El fin es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.editedLabor.descripcion.trim() == '' || this.editedLabor.descripcion.trim() == null) {
      this.snack.open('snack La descripcion es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.editedLabor.imagen.trim() == '' || this.editedLabor.imagen.trim() == null) {
      this.snack.open('snack El imagen es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    
    console.log(this.editedLabor)
    this.submitForm();
  }

  async submitForm(){
    console.log("submitLaboralItemForm");
    try{
      const response = await this.editUsuarioService.editProyecto(this.editedLabor).toPromise();
      console.log(response) ;
      await Swal.fire('ok', 'cambiosRealizados!', 'success');
      window.location.reload();
    }catch(err){
      console.log(err);
      await Swal.fire("Error", 'No se pudieron realizar los cambios', 'error');
    }
  }


}
