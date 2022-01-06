export class OpenAccountResponse {
  constructor(
    public id: number,
    public number: string,
    public balance: number,
    public createdAt: string,
    public createdBy: number,
    public updatedAt: string,
    public updatedBy: number,
    public customerId: number
  ) {}
}