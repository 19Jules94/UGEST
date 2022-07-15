import { Anhos } from "src/app/models/Gestion-AAcademicos/Anhos"; 
import { Asignaturas } from "src/app/models/Gestion-asignaturas/Asignaturas"; 
import { Titulaciones } from "src/app/models/Gestion-titulaciones/Titulaciones"; 

export class InfoAddGruposWrapper {
    public STATUS!: string;
    public CODE!: string;
    public RESOURCES!: {
         titulaciones: Titulaciones,       
         asignaturas:Asignaturas, 
         anhos: Anhos
    };
  }
  