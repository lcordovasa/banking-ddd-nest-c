export class IdNumber {
  protected readonly value: number;

  protected constructor(value: number) {
    this.value = Number(value);
  }

  public static of(value: number): IdNumber {
    return new IdNumber(value);
  }

  public getValue(): number {
    return Number(this.value);
  }
}