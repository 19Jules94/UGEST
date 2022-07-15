export class Horario {
    public constructor(
      public id: string,
      public profesor: string,
      public profesor_nombre: string,
      public anho: string,
      public grupo: string, 
      public grupo_nombre: string, 
      public asignatura: string,
      public asignatura_nombre: string,
      public titulacion: string,
      public titulacion_nombre: string,
      public espacio: string,
      public espacio_nombre: string,
      public asistencia: string, 
      public hora_inicio: string,
      public hora_fin: string,
      public dia: string,
      public fecha: string 
    ) {}
  
  }