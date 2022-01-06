export class OpenAccountRequest {
  constructor(
    public readonly customerId: number,
    public readonly number: string
  ) {
  }
}