import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { EditUsuarioService } from 'src/app/services/edit-usuario.service';
@Component({
  selector: 'laboral',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.css']
})
export class LaboralComponent {
  dataProyectos: any;
  isLogIn: any;
  addLabor: any;
  addNewLabor = {
    'nombre': '',
    'empresa': '',
    'cargo': '',
    'inicio': '',
    'fin': '',
    'descripcion': '',
    'imagen': ''
  }
  constructor(private datosProyectos: DataService,
    private userService: UserServiceService,
    private editUsuarioService: EditUsuarioService,
    private snack: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.datosProyectos.obtenerUsuario().subscribe(data => {
      this.dataProyectos = data.addProyecto;
      console.log(data.addProyecto)
    });

    this.islog();
  }

  islog() {

    if (this.userService.getToken()) {
      this.isLogIn = true
    } else {
      this.isLogIn = false
    }
    console.log("from labor" + this.isLogIn)
  }

  clickEdit() {
    console.log("edit usuario");
    this.addLabor = true;
  }

  closeEdit() {
    this.addNewLabor = {
      'nombre': '',
      'empresa': '',
      'cargo': '',
      'inicio': '',
      'fin': '',
      'descripcion': '',
      'imagen': ''
    }
    this.addLabor = false;
  }

  editForm() {
    if (this.addNewLabor.empresa.trim() == '' || this.addNewLabor.empresa.trim() == null) {
      this.snack.open('snack La empresa es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }

    if (this.addNewLabor.cargo.trim() == '' || this.addNewLabor.cargo.trim() == null) {
      this.snack.open('snack El cargo es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.addNewLabor.inicio.trim() == '' || this.addNewLabor.inicio.trim() == null) {
      this.snack.open('snack El inicio es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.addNewLabor.fin.trim() == '' || this.addNewLabor.fin.trim() == null) {
      this.snack.open('snack El fin es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.addNewLabor.descripcion.trim() == '' || this.addNewLabor.descripcion.trim() == null) {
      this.snack.open('snack El descripcion es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    if (this.addNewLabor.imagen.trim() == '' || this.addNewLabor.imagen.trim() == null) {
      this.snack.open('snack El imagen es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'mysnack'
      })
      return;
    }
    console.log(this.addNewLabor)
    this.submitEditForm();
  }

  proyectoId: any;
  clienteId: any;
  async submitEditForm() {
    try {
      const response = await this.editUsuarioService.newLabor(this.addNewLabor).toPromise();
      this.proyectoId = response;
      console.log(this.proyectoId);
      this.agregar(response);
  
      //existe el cliente?
      console.log('antes de consultar existencia');
      await this.consultarExistencia();
      
      await Swal.fire('ok', 'cambios ralizados!', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
      //alert("El Usuario o la contrasena son invalidos")
      await Swal.fire('Error', 'No se pudieron realizar los cambios', 'error');
    }
  }
  
  async consultarExistencia(){
    console.log("existencia")
    try {
      const response = await this.editUsuarioService.consultarClientes().toPromise();
      console.log(response);
  
      // Check if the response object is not null or undefined
      if (response) {
        // iterate over the response object here    
        var itemArray = Object.values(response);
        var finded = itemArray.find((elem) => elem.nombre.trim().toLowerCase() == this.addNewLabor.empresa.trim().toLowerCase());
  
        if (finded) {
          this.clienteId = finded.id;
          console.log(finded);
        }
        //si ya existe llamamos addClientetoProyecto
        //si no existe creamos un nuevoCliente y llamamos addClienteToProyecto
        if (this.clienteId) {
          this.existe(this.proyectoId, this.clienteId)
        } else {
          this.noExiste(this.proyectoId, this.clienteId)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  
  async existe(proyectoId: any, clienteId: any) {
    console.log("existe");
    console.log(clienteId)
    console.log(typeof clienteId, typeof proyectoId);
    try {
      const res = await this.editUsuarioService.addClienteToProyecto(proyectoId, clienteId).toPromise();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  
  async noExiste(proyectoId: any, clienteId: any) {
    console.log(clienteId)
    console.log("not clienteId found");
    var nuevoCliente = {
      'nombre': this.addNewLabor.empresa
    };
    try {
      const res = await this.editUsuarioService.nuevoCliente(nuevoCliente).toPromise();
      console.log(res, proyectoId);
      const res2 = await this.editUsuarioService.addClienteToProyecto(proyectoId, res).toPromise();
      console.log(res2);
    } catch (err) {
      console.log(err);
    }
  }
  
  async agregar(num: any) {
    try {
      const response = await this.editUsuarioService.agregarLabor(num).toPromise();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  

}
