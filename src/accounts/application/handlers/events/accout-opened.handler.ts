import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AccountOpened } from '../../../domain/events/account-opened.event';

@EventsHandler(AccountOpened)
export class AccountOpenedHandler implements IEventHandler<AccountOpened> {
  constructor() {}

  handle(event: AccountOpened) {
    console.log('handle logic for AccountOpened');
    console.log(event);
  }
}