export class RegisterCompany {
  constructor(
    public readonly name: string,
    public readonly ruc: string,
    public readonly createdAt: string,
    public readonly createdBy: number,
    public readonly updatedAt: string,
    public readonly updatedBy: number
  ) {}
}