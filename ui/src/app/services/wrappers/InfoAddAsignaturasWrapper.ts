import { Departamentos } from "src/app/models/Gestion-departamentos/Departamentos"; 
import { Profesores } from "src/app/models/Gestion-Profesores/Profesores"; 
import { Titulaciones } from "src/app/models/Gestion-titulaciones/Titulaciones"; 

export class InfoAddAsignaturasWrapper {
    public STATUS!: string;
    public CODE!: string;
    public RESOURCES!: {
         titulaciones: Titulaciones,       
         departamentos:Departamentos, 
         profesores: Profesores
    };
  }
  