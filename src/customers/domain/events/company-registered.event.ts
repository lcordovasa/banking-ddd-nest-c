import { CustomerRegistered } from './customer-registered.event';

export class CompanyRegistered extends CustomerRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id);
  }
}