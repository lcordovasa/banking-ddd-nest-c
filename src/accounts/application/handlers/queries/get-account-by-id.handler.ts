import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetAccountsDto } from '../../dtos/queries/get-accounts.dto';
import { GetAccountByIdQuery } from '../../queries/get-account-by-id.query';

@QueryHandler(GetAccountByIdQuery)
export class GetAccountByIdHandler implements IQueryHandler<GetAccountByIdQuery> {
  constructor() {}

  async execute(query: GetAccountByIdQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.balance,
      a.customer_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      accounts a
    WHERE
      a.id = ?;`;
    const ormAccounts = await manager.query(sql, [query.accountId]);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormAccount = ormAccounts[0];
    let accountDto = new GetAccountsDto();
    accountDto.id = Number(ormAccount.id);
    accountDto.number = ormAccount.number;
    accountDto.balance = Number(ormAccount.balance);
    accountDto.customerId = Number(ormAccount.customer_id);
    accountDto.createdAt = ormAccount.created_at;
    accountDto.createdBy = ormAccount.created_by;
    accountDto.updatedAt = ormAccount.updated_at;
    accountDto.updatedBy = ormAccount.updated_by;
    return accountDto;
  }
}