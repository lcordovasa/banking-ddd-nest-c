import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { OpenAccountRequest } from '../application/dtos/request/open-account-request.dto';
import { OpenAccountResponse } from '../application/dtos/response/open-account-response.dto';
import { AccountsApplicationService } from '../application/services/accounts-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetAccountByIdQuery } from '../application/queries/get-account-by-id.query';
import { GetAccountsQuery } from '../application/queries/get-accounts.query';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsApplicationService: AccountsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async open(
    @Body() openAccountRequest: OpenAccountRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenAccountResponse> = await this.accountsApplicationService.open(openAccountRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getAccounts(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetAccountsQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') accountId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetAccountByIdQuery(accountId));
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}