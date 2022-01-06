export class RegisterCompanyRequest {
  constructor(
    public readonly name: string,
    public readonly ruc: string,
  ) {}
}