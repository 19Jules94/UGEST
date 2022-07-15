import { AAcademicos } from "src/app/models/Gestion-AAcademico/AAcademicos"; 
import { Anhos } from "src/app/models/Gestion-AAcademicos/Anhos"; 
import { Asignaturas } from "src/app/models/Gestion-asignaturas/Asignaturas";
import { Centros } from "src/app/models/Gestion-centros/Centros"; 
import { Espacios } from "src/app/models/Gestion-espacios/Espacios"; 
import { Grupos } from "src/app/models/Gestion-grupos/Grupos"; 
import { Profesores } from "src/app/models/Gestion-Profesores/Profesores"; 
import { Titulaciones } from "src/app/models/Gestion-titulaciones/Titulaciones"; 
import { Universidades } from "src/app/models/Gestion-Universidades/Universidades"; 

export class InfoAddHorariosWrapper {
    public STATUS!: string;
    public CODE!: string;
    public RESOURCES!: {
         anho_academicos: AAcademicos,       
         profesores:Profesores, 
         grupos: Grupos,
         espacios: Espacios,
         asignaturas: Asignaturas,
         titulaciones: Titulaciones,
         universidades: Universidades,
         centros: Centros

    };
  }
  