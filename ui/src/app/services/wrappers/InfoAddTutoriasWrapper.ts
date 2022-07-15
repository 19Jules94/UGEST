import { AAcademicos } from "src/app/models/Gestion-AAcademico/AAcademicos"; 
import { Profesores } from "src/app/models/Gestion-Profesores/Profesores"; 
import { Espacios } from "src/app/models/Gestion-espacios/Espacios"; 

export class InfoAddTutoriasWrapper {
  public STATUS!: string;
  public CODE!: string;
  public RESOURCES!: {
    anho_academicos: AAcademicos,
    profesores:Profesores,
    espacios: Espacios,
  };
}
