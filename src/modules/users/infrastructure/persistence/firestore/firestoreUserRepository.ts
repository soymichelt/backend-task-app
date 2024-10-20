import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { UserRepository } from '@modules/users/domain/repositories/userRepository';
import { User } from '@modules/users/domain/user';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { FirestoreRepository } from '@shared/infrastructure/repositories/firestore/firestoreRepository';
import { injectable } from 'tsyringe';

@injectable()
export class FirestoreUserRepository extends FirestoreRepository<User> implements UserRepository {
  private static USER_COLLECTION_NAME = 'users';

  constructor() {
    super({
      collectionName: FirestoreUserRepository.USER_COLLECTION_NAME,
    });
  }

  public async save(user: User): Promise<void> {
    await this.persist(user);
  }

  public async find(userId: UserId): Promise<User | undefined> {
    const user = await this.get(userId.value);

    return user;
  }

  public async findByEmail(email: UserEmail): Promise<User | undefined> {
    const collection = this.getCollection();

    const query = await collection.where('email', '==', email.value).limit(1).get();
    if (query.empty) return;

    const entity = await this.mapToEntity(query.docs[0].data());
    return entity;
  }

  protected getPrimaryKey(entity: User): string {
    return entity.userId.value;
  }

  protected mapToEntity(primitives: any): Promise<User> {
    const user = Promise.resolve(User.fromPrimitives(primitives));

    return user;
  }
}
