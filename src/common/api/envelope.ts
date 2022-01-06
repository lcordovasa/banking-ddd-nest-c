import { AppError } from '../application/app.error';

export class Envelope {
  constructor(
    public readonly result: any,
    public readonly errors: AppError[],
  ) {}

  static ok(result: any): Envelope {
    return new Envelope(result, []);
  }

  static error(errors: AppError[]): Envelope {
    if (errors == null) errors = [];
    return new Envelope(null, errors);
  }

  static serverError(): Envelope {
    const errors: AppError[] = [];
    errors.push(new AppError('Internal Server Error', null));
    return new Envelope(null, errors);
  }

  static notFound(): Envelope {
    const errors: AppError[] = [];
    errors.push(new AppError('Entity Not Found', null));
    return new Envelope(null, errors);
  }
}