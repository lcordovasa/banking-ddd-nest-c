import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';

@Entity('customers')
@TableInheritance({ column: 'type', })
export class CustomerTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column({ name: 'type', type: 'enum', enum: CustomerType, default: CustomerType.COMPANY })
  readonly type: CustomerType;
}