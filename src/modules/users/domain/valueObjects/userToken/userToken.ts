import { StringValueObject } from '@shared/domain/valueObjects/string/string';
import { UserTokenRequiredException } from '@modules/users/domain/exceptions/userTokenRequiredException';

export class UserToken extends StringValueObject {
  private constructor(value: string) {
    super(value);

    this.validate(value);
  }

  public static build(value: string): UserToken {
    return new UserToken(value);
  }

  protected override validate(value: string): void {
    if (!value?.trim()) {
      throw new UserTokenRequiredException();
    }
  }
}
