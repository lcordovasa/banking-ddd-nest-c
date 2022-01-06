import { PersonTypeORM } from '../../infrastructure/persistence/typeorm/entities/person.typeorm';
import { Person } from '../../domain/entities/person.entity';
import { PersonNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/person-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class PersonMapper {
  public static toTypeORM(person: Person): PersonTypeORM {
    const personTypeORM: PersonTypeORM = new PersonTypeORM();
    personTypeORM.name = PersonNameTypeORM.from(person.getName().getFirstName(), person.getName().getLastName());
    personTypeORM.dni = DniTypeORM.from(person.getDni().getValue());
    const createdAt: string = person.getAuditTrail() != null && person.getAuditTrail().getCreatedAt() != null ? person.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = person.getAuditTrail() != null && person.getAuditTrail().getCreatedBy() != null ? person.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = person.getAuditTrail() != null && person.getAuditTrail().getUpdatedAt() != null ? person.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = person.getAuditTrail() != null && person.getAuditTrail().getUpdatedBy() != null ? person.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    personTypeORM.auditTrail = auditTrailTypeORM;
    return personTypeORM;
  }
}