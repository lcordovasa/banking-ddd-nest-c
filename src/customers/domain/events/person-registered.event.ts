import { CustomerRegistered } from './customer-registered.event';

export class PersonRegistered extends CustomerRegistered {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
  ) {
    super(id);
  }
}