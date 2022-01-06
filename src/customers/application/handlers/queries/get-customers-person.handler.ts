import { GetCustomersPersonQuery } from '../../queries/get-customers-person.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetCustomersPersonDto } from '../../dtos/queries/get-customers-person.dto';

@QueryHandler(GetCustomersPersonQuery)
export class GetCustomersPersonHandler implements IQueryHandler<GetCustomersPersonQuery> {
  constructor() {}

  async execute(query: GetCustomersPersonQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      customers
    WHERE
      type = 'P'
    ORDER BY
      last_name, first_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetCustomersPersonDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetCustomersPersonDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.firstName = ormCustomer.firstName;
      customerDto.lastName = ormCustomer.lastName;
      customerDto.dni = ormCustomer.dni;
      return customerDto;
    });
    return customers;
  }
}