import { Column } from 'typeorm';

export class AuditTrailTypeORM {
  @Column('datetime', { name: 'created_at', nullable: true })
  public createdAt: string;

  @Column('bigint', { name: 'created_by', nullable: true })
  public createdBy: number;

  @Column('datetime', { name: 'updated_at', nullable: true })
  public updatedAt: string;

  @Column('bigint', { name: 'updated_by', nullable: true })
  public updatedBy: number;

  private constructor(createdAt: string, createdBy: number, updatedAt: string, updatedBy: number) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  public static from(createdAt: string, createdBy: number, updatedAt: string, updatedBy: number): AuditTrailTypeORM {
    return new AuditTrailTypeORM(createdAt, createdBy, updatedAt, updatedBy);
  }
}