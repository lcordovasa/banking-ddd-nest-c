export class EditPersonRequest {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
  ) {}
}
