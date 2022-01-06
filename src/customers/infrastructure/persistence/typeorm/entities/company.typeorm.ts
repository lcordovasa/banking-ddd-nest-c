import { ChildEntity, Column, Unique } from 'typeorm';
import { CustomerTypeORM } from './customer.typeorm';
import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { CompanyNameTypeORM } from '../value-objects/company-name.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';

@ChildEntity(CustomerType.COMPANY)
@Unique('UQ_customers_company_name', ['companyName.value'])
@Unique('UQ_customers_ruc', ['ruc.value'])
export class CompanyTypeORM extends CustomerTypeORM {
  @Column((type) => CompanyNameTypeORM, { prefix: false })
  public companyName: CompanyNameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}