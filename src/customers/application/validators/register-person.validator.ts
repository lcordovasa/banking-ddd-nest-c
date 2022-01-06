import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterPersonRequest } from '../dtos/request/register-person-request.dto';
import { Repository } from 'typeorm';
import { CustomerTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { PersonTypeORM } from '../../infrastructure/persistence/typeorm/entities/person.typeorm';

@Injectable()
export class RegisterPersonValidator {
  constructor(
    @InjectRepository(PersonTypeORM)
    private personRepository: Repository<PersonTypeORM>,
  ) {
  }

  public async validate(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPersonRequest.firstName ? registerPersonRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPersonRequest.lastName ? registerPersonRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPersonRequest.dni ? registerPersonRequest.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: CustomerTypeORM = await this.personRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (customer != null) {
      notification.addError('dni is taken', null);
    }
    return notification;
  }
}