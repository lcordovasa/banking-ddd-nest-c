export class RegisterCompanyResponse {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly ruc: string
  ) {}
}