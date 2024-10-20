import { User } from '@modules/users/domain/user';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';

export interface UserRepository {
  save(user: User): Promise<void>;
  find(userId: UserId): Promise<User | undefined>;
  findByEmail(email: UserEmail): Promise<User | undefined>;
}
