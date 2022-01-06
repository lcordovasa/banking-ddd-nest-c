export class RegisterPerson {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly createdAt: string,
    public readonly createdBy: number,
    public readonly updatedAt: string,
    public readonly updatedBy: number
  ) {}
}