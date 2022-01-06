import { Column, Unique } from 'typeorm';

export class DniTypeORM {
  @Column('varchar', { name: 'dni', length: 8, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): DniTypeORM {
    return new DniTypeORM(value);
  }
}