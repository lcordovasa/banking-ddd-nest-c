export class DepositRequestDto {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number
  ) {
  }
}