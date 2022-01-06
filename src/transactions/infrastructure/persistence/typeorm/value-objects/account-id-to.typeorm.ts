import { Column } from 'typeorm';

export class AccountIdToTypeORM {
  @Column('bigint', { name: 'account_id_to', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): AccountIdToTypeORM {
    return new AccountIdToTypeORM(value);
  }
}