import * as admin from 'firebase-admin';
import { injectable } from 'tsyringe';
import { AuthService } from '@modules/users/domain/services/authService';
import { User } from '@modules/users/domain/user';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { EmailAlreadyExistsException } from '@modules/users/domain/exceptions/emailAlreadyExistsException';
import { CreateUserAuthException } from '@modules/users/domain/exceptions/createUserAuthException';
import { GetUserAuthException } from '@modules/users/domain/exceptions/getUserAuthException';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { UserToken } from '@modules/users/domain/valueObjects/userToken/userToken';
import { UserAuthDisabledException } from '@modules/users/domain/exceptions/userAuthDisabledException';
import { UserTokenInvalidException } from '@modules/users/domain/exceptions/userTokenInvalidException';
import { GetUserAuthByTokenException } from '@modules/users/domain/exceptions/getUserAuthByTokenException';

@injectable()
export class FirebaseAuthService implements AuthService {
  public async create(user: User): Promise<UserToken> {
    try {
      const primitives = user.toPrimitives();
      const auth = this.getAuth();
      const userRecord = await auth.createUser({
        uid: primitives.userId,
        email: primitives.email,
        password: primitives.password,
        displayName: primitives.email,
      });

      const token = await auth.createCustomToken(userRecord.uid);
      return UserToken.build(token);
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        throw new EmailAlreadyExistsException(user.email.value);
      }

      throw new CreateUserAuthException(user.email.value, error);
    }
  }

  public async get(userId: UserId): Promise<User> {
    try {
      const auth = this.getAuth();

      const userRecord = await auth.getUser(userId.value);

      const user = User.fromPrimitives({
        userId: userRecord.uid as string,
        email: userRecord.email as string,
      });

      return user;
    } catch (error: any) {
      throw new GetUserAuthException(userId.value, error);
    }
  }

  public async getByEmail(email: UserEmail): Promise<User> {
    try {
      const auth = this.getAuth();

      const userRecord = await auth.getUserByEmail(email.value);

      const user = User.fromPrimitives({
        userId: userRecord.uid as string,
        email: userRecord.email as string,
      });

      return user;
    } catch (error: any) {
      throw new GetUserAuthException(email.value, error);
    }
  }

  public async getByToken(token: UserToken): Promise<User> {
    try {
      const auth = this.getAuth();

      const payload = await auth.verifyIdToken(token.value);

      const user = User.fromPrimitives({
        userId: payload.uid,
        email: payload.email as string,
      });

      return user;
    } catch (error: any) {
      if (error.code === 'auth/user-disabled') {
        throw new UserAuthDisabledException();
      }
      if (error.code === 'auth/id-token-revoked') {
        throw new UserTokenInvalidException();
      }

      throw new GetUserAuthByTokenException(token.value, error);
    }
  }

  private getAuth(): admin.auth.Auth {
    if (admin.apps.length === 0) {
      admin.initializeApp();
    }

    const auth = admin.auth();

    return auth;
  }
}
