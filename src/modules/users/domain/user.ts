import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { UserPassword } from '@modules/users/domain/valueObjects/userPassword/userPassword';

export type UserProps = {
  userId: UserId;
  email: UserEmail;
  password?: UserPassword;
};

export type UserPrimitives = {
  userId: string;
  email: string;
  password?: string;
};

export class User extends AggregateRoot {
  private _userId: UserId;
  private _email: UserEmail;
  private _password?: UserPassword;

  private constructor(props: UserProps) {
    super();

    this._userId = props.userId;
    this._email = props.email;
    this._password = props.password;
  }

  public static build(props: UserProps): User {
    return new User(props);
  }

  public static fromPrimitives(props: UserPrimitives): User {
    return this.build({
      userId: UserId.build(props.userId),
      email: UserEmail.build(props.email),
      password: props.password ? UserPassword.build(props.password) : undefined,
    });
  }

  public get userId(): UserId {
    return this._userId;
  }

  public get email(): UserEmail {
    return this._email;
  }

  public get password(): UserPassword | undefined {
    return this._password;
  }

  public toPrimitives(): UserPrimitives {
    return {
      userId: this._userId.value,
      email: this._email.value,
      password: this._password?.value,
    };
  }
}
