import { Role } from './role.model';

export class User {
  constructor(
    public id: string = '',
    public code: string = '',
    public name: string = '',
    public email: string = '',
    public roles: Array<Role> = [],
    public auth: string = ''
  ) {}

  full(
    id: string,
    code: string,
    name: string,
    email: string,
    roles: Array<Role>
  ): User {
    this.id = id;
    this.code = code;
    this.name = name;
    this.email = email;
    this.roles = roles;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      codigo: this.code,
      nome: this.name,
      email: this.email,
      permissoes: this.roles,
      auth: this.auth,
    };
  }

  static fromObject(object: any) {
    return new User(
      object.id,
      object.codigo,
      object.nome,
      object.email,
      object.permissoes,
      object.auth
    );
  }
}
