import { Column } from 'typeorm';

export class AccountIdFromTypeORM {
  @Column('bigint', { name: 'account_id_from', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): AccountIdFromTypeORM {
    return new AccountIdFromTypeORM(value);
  }
}