import { Column, Unique } from 'typeorm';

export class RucTypeORM {
  @Column('varchar', { name: 'ruc', length: 11, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): RucTypeORM {
    return new RucTypeORM(value);
  }
}