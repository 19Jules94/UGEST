import { Usuario } from "../Gestion-usuario/Usuario";
import { Departamento } from "../Gestion-Departamento/Departamento";

export class Usuarios_Departamentos {
  public constructor(
    public usuarios: Array<Usuario>,
    public departamentos: Array<Departamento>
  ) {}

}
