import { Cliente } from "./cliente";
import { Tecnologia } from "./tecnologia";

export class Proyecto {
    constructor(
        public id:number,
        public addCliente: Cliente[] | undefined,
        public addTecnologia: Tecnologia[] | undefined,
        public nombre:string,
        public cargo:string,
        public descripcion:string,
        public imagen:string,
        public inicio:number,
        public fin:number,

    ){}
}
