export interface Usuario{
    addProyecto: Usuario[] | undefined;
    addEducacion: Usuario[] | undefined;
    id:number;
    nombre:string;
    email:string;
    password:string;
    fecha_nacimiento?:Date;
    imagen_perfil?:string;
    imagen_bg?:string;
    ocupacion?:string;
    sobre_mi?:string;
    
}

export interface Credentials{
    email:string;
    password:string;
}

export interface Educacion{
    id:number;
    titulo:string;
    descripcion?:string;
    inicio?:number;
    fin?:number;
    imagen?:string;

}

export interface Proyecto{
    id:number;
    titulo:string;
    imagen?:string;
    inicio?:number;
    fin?:number;
    descripcion?:string;
}


export interface Cliente{
    id:number;
    nombre:string;
}

export interface Tecnologia{
    id:number;
    nombre:string;
    puntuacion?:number;
}

export interface Institucion{
    id:number;
    nombre:string;
    imagen?:string;
    url?:string;
}