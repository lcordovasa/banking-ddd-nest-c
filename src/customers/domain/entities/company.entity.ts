import { CustomerId } from '../value-objects/customer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Customer } from './customer.entity';
import { Ruc } from '../value-objects/ruc.value';
import { CustomerType } from '../enums/customer-type.enum';
import { CompanyRegistered } from '../events/company-registered.event';
import { CompanyName } from '../../../common/domain/value-objects/company-name.value';

export class Company extends Customer {
  private name: CompanyName;
  private ruc: Ruc;

  public constructor(name: CompanyName, ruc: Ruc, auditTrail: AuditTrail) {
    super(CustomerType.COMPANY, auditTrail);
    this.name = name;
    this.ruc = ruc;
  }

  public register() {
    const event = new CompanyRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getName(): CompanyName {
    return this.name;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public changeName(name: CompanyName): void {
    this.name = name;
  }

  public changeRuc(ruc: Ruc): void {
    this.ruc = ruc;
  }
}