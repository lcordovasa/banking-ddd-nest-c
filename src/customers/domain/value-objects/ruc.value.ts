import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Ruc {
  private value: string;
  private static MAX_LENGTH: number = 11;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(ruc: string): Result<AppNotification, Ruc>
  {
    let notification: AppNotification = new AppNotification();
    ruc = (ruc ?? "").trim();
    if (ruc === "") {
      notification.addError('ruc is required', null);
    }
    if (ruc.length != this.MAX_LENGTH) {
      notification.addError('ruc field must have ' + Ruc.MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(ruc) === false) {
      notification.addError('ruc format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Ruc(ruc));
  }

  public getValue(): string {
    return this.value;
  }
}