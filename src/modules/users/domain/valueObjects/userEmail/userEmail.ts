import { StringValueObject } from '@shared/domain/valueObjects/string/string';
import { EmailIsInvalidException } from '@modules/users/domain/exceptions/emailIsInvalidException';

export class UserEmail extends StringValueObject {
  private constructor(value: string) {
    super(value);

    this.validateEmail(value);
  }

  public static build(value: string): UserEmail {
    return new UserEmail(value);
  }

  private validateEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new EmailIsInvalidException(value);
    }
  }
}
