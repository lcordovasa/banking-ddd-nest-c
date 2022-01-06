import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Address {
  private address: string;
  private districtId: string;
  private static ADDRESS_MAX_LENGTH: number = 100;
  private static DISTRICT_ID_MAX_LENGTH: number = 6;

  private constructor(address: string, districtId: string) {
    this.address = address;
    this.districtId = districtId;
  }

  public static create(address: string, districtId: string): Result<AppNotification, Address> {
    let notification: AppNotification = new AppNotification();
    address = (address ?? "").trim();
    districtId = (districtId ?? "").trim();
    if (address === "") {
      notification.addError('address is required', null);
    }
    if (districtId === "") {
      notification.addError('districtId is required', null);
    }
    if (address.length > this.ADDRESS_MAX_LENGTH) {
      notification.addError('The maximum length of an address is ' + this.ADDRESS_MAX_LENGTH + ' characters including spaces', null);
    }
    if (districtId.length != this.DISTRICT_ID_MAX_LENGTH) {
      notification.addError('districtId field must have ' + this.DISTRICT_ID_MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]$');
    if (regExp.test(districtId) === false) {
      notification.addError('districtId format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Address(address, districtId));
  }
}