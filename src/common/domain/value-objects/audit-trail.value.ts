import { UserId } from '../../../users/domain/value-objects/user-id.value';
import { DateTime } from './date-time.value';

export class AuditTrail {
  private readonly createdAt: DateTime;
  private readonly createdBy: UserId;
  private readonly updatedAt: DateTime;
  private readonly updatedBy: UserId;

  private constructor(createdAt: DateTime, createdBy: UserId, updatedAt: DateTime, updatedBy: UserId) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  public static from(createdAt: DateTime, createdBy: UserId, updatedAt: DateTime, updatedBy: UserId) {
    return new AuditTrail(createdAt, createdBy, updatedAt, updatedBy);
  }

  public getCreatedAt(): DateTime {
    return this.createdAt;
  }

  public getCreatedBy(): UserId {
    return this.createdBy;
  }

  public getUpdatedAt(): DateTime {
    return this.updatedAt;
  }

  public getUpdatedBy(): UserId {
    return this.updatedBy;
  }
}