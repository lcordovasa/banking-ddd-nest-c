import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { TransactionsApplicationService } from '../application/services/transactions-application.service';
import { DepositRequestDto } from '../application/dtos/request/deposit-request.dto';
import { DepositResponseDto } from '../application/dtos/response/deposit-response.dto';
import { WithdrawRequestDto } from '../application/dtos/request/withdraw-request.dto';
import { TransferRequestDto } from '../application/dtos/request/transfer-request.dto';
import { TransferResponseDto } from '../application/dtos/response/transfer-response.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsApplicationService: TransactionsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/deposit')
  async deposit(
    @Body() depositRequestDto: DepositRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DepositResponseDto> = await this.transactionsApplicationService.deposit(depositRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/withdraw')
  async withdraw(
    @Body() withdrawRequestDto: WithdrawRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DepositResponseDto> = await this.transactionsApplicationService.withdraw(withdrawRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/transfer')
  async transfer(
    @Body() transferRequestDto: TransferRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, TransferResponseDto> = await this.transactionsApplicationService.transfer(transferRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}