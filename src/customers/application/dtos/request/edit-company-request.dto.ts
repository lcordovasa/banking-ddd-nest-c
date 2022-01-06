export class EditCompanyRequest {
  constructor(
    public readonly name: string,
    public readonly ruc: string
  ) {}
}