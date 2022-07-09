import { Funcionalidades_Info } from "./Funcionalidades-info";
import { Acciones_Info } from "./Acciones-info";
import { Roles_Info_Add } from "./Roles-info-Add";

export class Info_Add_Permisos {
  public constructor(
    public roles: Array<Roles_Info_Add>,
    public acciones: Array<Acciones_Info>,
    public funcionalidades: Array<Funcionalidades_Info>
  ) {}

}