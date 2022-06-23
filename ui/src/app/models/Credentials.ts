import {Profile} from "./Profile";

export class Credentials {
  public constructor(
    public token: string,
    public acciones_funcionalidades: Array<any>,
    public profile: Profile
  ) {}

}
