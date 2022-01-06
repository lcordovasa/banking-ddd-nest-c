export class WithdrawRequestDto {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number
  ) {
  }
}