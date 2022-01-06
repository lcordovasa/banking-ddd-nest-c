import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PersonRegistered } from '../../../domain/events/person-registered.event';

@EventsHandler(PersonRegistered)
export class PersonRegisteredHandler implements IEventHandler<PersonRegistered> {
  constructor() {}

  handle(event: PersonRegistered) {
    console.log('handle logic for PersonRegistered');
    console.log(event);
  }
}