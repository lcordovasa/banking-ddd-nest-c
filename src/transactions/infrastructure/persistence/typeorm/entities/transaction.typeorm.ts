import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountIdFromTypeORM } from '../value-objects/account-id-from.typeorm';
import { AccountIdToTypeORM } from '../value-objects/account-id-to.typeorm';
import { AmountTypeORM } from '../value-objects/amount.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { TransactionStatus } from '../../../../domain/enums/transaction.status.enum';

@Entity('transactions')
export class TransactionTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column('char', { name: 'type', length: 1, nullable: false })
  public type: string;

  @Column((type) => AccountIdFromTypeORM, { prefix: false })
  public accountIdFrom: AccountIdFromTypeORM;

  @Column((type) => AccountIdToTypeORM, { prefix: false })
  public accountIdTo: AccountIdToTypeORM;

  @Column((type) => AmountTypeORM, { prefix: false })
  public amount: AmountTypeORM;

  @Column('tinyint', { name: 'status', width: 2, unsigned: true, nullable: false, })
  public status: TransactionStatus;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}