import { AppError } from './app.error';

export class AppNotification {
  private errors: AppError[] = [];
  private cause: Error;

  public addError(message: string, cause: Error): void {
    this.errors.push(new AppError(message, cause));
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public getErrors(): AppError[] {
    return this.errors;
  }
}