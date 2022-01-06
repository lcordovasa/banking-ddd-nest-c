import { Column, Unique } from 'typeorm';

export class AccountNumberTypeORM {
  @Column('varchar', { name: 'number', length: 15, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): AccountNumberTypeORM {
    return new AccountNumberTypeORM(value);
  }
}