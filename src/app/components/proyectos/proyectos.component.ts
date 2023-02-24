import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

declare var window:any;

@Component({
  selector: 'proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  dataProyectos:any;
  modal_0:any;
  modal_1:any;
  modal_2:any;
  modal_3:any;
  constructor(private datosProyectos:DataService){
   
  }

  ngOnInit(): void{
    this.datosProyectos.obtenerUsuario().subscribe(data =>{
      console.log(data.addProyecto)
    });

    this.modal_0= new window.bootstrap.Modal(
      document.getElementById("myModal_0")
    );

    this.modal_1= new window.bootstrap.Modal(
      document.getElementById("myModal_1")
    );

    this.modal_2= new window.bootstrap.Modal(
      document.getElementById("myModal_2")
    );

    this.modal_3= new window.bootstrap.Modal(
      document.getElementById("myModal_3")
    );
  }

  openM_0(){
    this.modal_0.show();
  }
  closeM_0(){
    this.modal_0.hide();
  }
  openM_1(){
    this.modal_1.show();
  }
  closeM_1(){
    this.modal_1.hide();
  }
  openM_2(){
    this.modal_2.show();
  }
  closeM_2(){
    this.modal_2.hide();
  }
  openM_3(){
    this.modal_3.show();
  }
  closeM_3(){
    this.modal_3.hide();
  }

}
