export class TransferRequestDto {
  constructor(
    public readonly fromAccountNumber: string,
    public readonly toAccountNumber: string,
    public readonly amount: number
  ) {
  }
}