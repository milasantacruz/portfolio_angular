import { Educacion } from "./educacion";
import { Proyecto } from "./proyecto";

export class Usuario {
    constructor(
        public id:number,
        public addEducacion: Educacion[] | undefined,
        public addProyecto: Proyecto[] | undefined,
        public nombre:string,
        public email:string,
        public password:string,
        public imagen_perfil?:string,
        public imagen_bg?:string,
        public fecha_nacimiento?:Date,
        public ocupacion?:string,
        public sobre_mi?:string,
    ){}
}
