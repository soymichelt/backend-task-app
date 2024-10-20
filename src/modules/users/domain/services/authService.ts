import { User } from '@modules/users/domain/user';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { UserToken } from '@modules/users/domain/valueObjects/userToken/userToken';

export interface AuthService {
  create(user: User): Promise<UserToken>;
  get(userId: UserId): Promise<User>;
  getByEmail(email: UserEmail): Promise<User>;
  getByToken(token: UserToken): Promise<User>;
}
