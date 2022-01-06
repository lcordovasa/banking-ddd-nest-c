import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { Envelope } from './envelope';
import { AppError } from '../application/app.error';

export class ApiController {
  static ok(response: Response, result: object): Envelope {
    response.status(HttpStatus.OK);
    return Envelope.ok(result);
  }

  static created(response: Response, result: object): Envelope {
      response.status(HttpStatus.CREATED);
      return Envelope.ok(result);
  }

  static error(response: Response, errors: AppError[]): Envelope {
      response.status(HttpStatus.BAD_REQUEST);
      return Envelope.error(errors);
  }

  static serverError(response: Response, error): Envelope {
      console.log(error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return Envelope.serverError();
  }

  static notFound(response: Response): Envelope {
      response.status(HttpStatus.NOT_FOUND);
    return Envelope.notFound();
  }
}