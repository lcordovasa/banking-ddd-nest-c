import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerId } from '../value-objects/customer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CustomerType } from '../enums/customer-type.enum';

export class Customer extends AggregateRoot {
  protected id: CustomerId;
  protected type: CustomerType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: CustomerType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getType(): CustomerType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: CustomerId) {
    this.id = id;
  }
}