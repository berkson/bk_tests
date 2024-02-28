export class User {
  constructor(
    public id: number = 0,
    public code?: string,
    public name?: string,
    public email?: string
  ) {}

  full(id: number, code: string, name: string, email: string): User {
    this.id = id;
    this.code = code;
    this.name = name;
    this.email = email;
    return this;
  }
}
