import { Perfil } from './Perfil';
export class Credenciales {
  public constructor(
    public token: string,
    public acciones_funcionalidades: Array<any>,
    public perfil: Perfil
  ) {}
}
