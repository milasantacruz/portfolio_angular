import { Institucion } from "./institucion";

export class Educacion {
    constructor(
        public id:number,
        public institucion:string,
        public titulo:string,
        public descripcion?:string,
        public imagen?:string,
        public inicio?:number,
        public fin?:number,
    ){}
}
