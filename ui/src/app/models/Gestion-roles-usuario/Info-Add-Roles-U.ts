import { Usuarios_Info_Add_RU } from "./Usuarios-info-add-RU";
import { Roles_Info_Add_RU } from "./Roles-info-add-RU";

export class Info_Add_Roles_U {
  public constructor(
    public usuarios: Array<Usuarios_Info_Add_RU>,
    public roles: Array<Roles_Info_Add_RU>
  ) {}

}
