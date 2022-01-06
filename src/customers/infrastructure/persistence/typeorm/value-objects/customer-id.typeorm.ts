import { PrimaryGeneratedColumn } from 'typeorm';

export class CustomerIdTypeorm {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): CustomerIdTypeorm  {
    return new CustomerIdTypeorm(value);
  }
}