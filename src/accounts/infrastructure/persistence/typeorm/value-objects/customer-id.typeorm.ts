import { Column } from 'typeorm';

export class CustomerIdTypeORM {
  @Column('bigint', { name: 'customer_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): CustomerIdTypeORM  {
    return new CustomerIdTypeORM(value);
  }
}