export class TransferResponseDto {
  constructor(
    public readonly transactionId: number,
    public readonly transactionType: string,
    public readonly fromAccountNumber: string,
    public readonly toAccountNumber: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: string
  ) {
  }
}