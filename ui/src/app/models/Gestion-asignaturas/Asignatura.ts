export class Asignatura {
    public constructor(
      public id:string,
      public titulacion: string,
      public nombre_titulacion: string,
      public anhoacademico: string,
      public departamento: string,
      public nombre_departamento: string,
      public profesor: string,
      public nombre_profesor: string,
      public codigo: string,
      public nombre: string,
      public contenido: string,
      public creditos: string,
      public tipo: string,
      public horas: string,
      public cuatrimestre: string
    ) {
      if (profesor == null){
        this.profesor = 'No tiene';
      }
      if (nombre_profesor == null){
        this.nombre_profesor = 'No tiene';
      }
    }
  
  }