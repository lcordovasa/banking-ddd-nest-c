import { ChildEntity, Column, Unique } from 'typeorm';
import { CustomerTypeORM } from './customer.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/person-name.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';

@ChildEntity(CustomerType.PERSON)
@Unique('UQ_customers_dni', ['dni.value'])
export class PersonTypeORM extends CustomerTypeORM {
  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}