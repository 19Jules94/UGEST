import { Anhos } from "src/app/models/Gestion-AAcademicos/Anhos"; 
import { Centros } from "src/app/models/Gestion-centros/Centros"; 
import { Usuarios } from "src/app/models/Gestion-usuario/Usuarios"; 

export class InfoAddTitulacionesWrapper {
    public STATUS!: string;
    public CODE!: string;
    public RESOURCES!: {
         centros: Centros,      
         usuarios: Usuarios,
         anhos: Anhos
    };
  }
  