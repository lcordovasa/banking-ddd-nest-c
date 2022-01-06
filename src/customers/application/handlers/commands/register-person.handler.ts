import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonFactory } from '../../../domain/factories/person.factory';
import { CustomerId } from '../../../domain/value-objects/customer-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { PersonName } from '../../../../common/domain/value-objects/person-name.value';
import { RegisterPerson } from '../../commands/register-person.command';
import { Person } from '../../../domain/entities/person.entity';
import { PersonMapper } from '../../mappers/person.mapper';
import { PersonTypeORM } from '../../../infrastructure/persistence/typeorm/entities/person.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterPerson)
export class RegisterPersonHandler
  implements ICommandHandler<RegisterPerson> {
  constructor(
    @InjectRepository(PersonTypeORM)
    private personRepository: Repository<PersonTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterPerson) {
    let customerId: number = 0;
    const personNameResult: Result<AppNotification, PersonName> = PersonName.create(command.firstName, command.lastName);
    if (personNameResult.isFailure()) {
      return customerId;
    }
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return customerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let person: Person = PersonFactory.createFrom(personNameResult.value, dniResult.value, auditTrail);
    let personTypeORM: PersonTypeORM = PersonMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return customerId;
    }
    customerId = Number(personTypeORM.id);
    person.changeId(CustomerId.of(customerId));
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return customerId;
  }
}