import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Email {
  private value: string;
  private static MAX_LENGTH: number = 150;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Result<AppNotification, Email>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('email is required', null);
    }
    if (value.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an email is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    const regExp = new RegExp('^(.+)@(.+)$');
    if (regExp.test(value) === false) {
      notification.addError('email format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Email(value));
  }
}