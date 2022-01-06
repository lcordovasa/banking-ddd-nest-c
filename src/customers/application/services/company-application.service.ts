import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterCompanyValidator } from '../validators/register-company.validator';
import { RegisterCompany } from '../commands/register-company.command';
import { RegisterCompanyRequest } from '../dtos/request/register-company-request.dto';
import { RegisterCompanyResponse } from '../dtos/response/register-company-response.dto';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class CompanyApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerCompanyValidator: RegisterCompanyValidator,
  ) {}

  async register(
    registerCompanyRequest: RegisterCompanyRequest,
  ): Promise<Result<AppNotification, RegisterCompanyResponse>> {
    const notification: AppNotification = await this.registerCompanyValidator.validate(registerCompanyRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerCompany: RegisterCompany = new RegisterCompany(
      registerCompanyRequest.name,
      registerCompanyRequest.ruc,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const customerId = await this.commandBus.execute(registerCompany);
    const registerCompanyResponse: RegisterCompanyResponse = new RegisterCompanyResponse(
      customerId,
      registerCompanyRequest.name,
      registerCompanyRequest.ruc
    );
    return Result.ok(registerCompanyResponse);
  }
}