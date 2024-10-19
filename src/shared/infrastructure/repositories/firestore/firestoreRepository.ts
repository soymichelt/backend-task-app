import * as admin from 'firebase-admin';
import { AggregateRoot } from '@shared/domain/aggregateRoot';

export type FirestoreRepositoryProps = {
  collectionName: string;
};

export abstract class FirestoreRepository<T extends AggregateRoot> {
  private collectionName: string;

  constructor(props: FirestoreRepositoryProps) {
    this.collectionName = props.collectionName;
  }

  protected abstract getPrimaryKey(entity: T): string;
  protected abstract mapToEntity(primitives: any): Promise<T>;

  protected async get(docId: string): Promise<T | undefined> {
    const collection = this.getCollection();

    const document = await collection.doc(docId).get();
    if (!document.exists) return;

    const entity = await this.mapToEntity(document.data());
    return entity;
  }

  protected async delete(entity: T): Promise<void> {
    const primaryKey = this.getPrimaryKey(entity);

    const collection = this.getCollection();

    await collection.doc(primaryKey).delete();
  }

  protected async persist(entity: T): Promise<T> {
    const primaryKey = this.getPrimaryKey(entity);
    const primitives = entity.toPrimitives();

    const collection = this.getCollection();

    await collection.doc(primaryKey).set(primitives);

    return entity;
  }

  protected getFirestoreDb(): admin.firestore.Firestore {
    if (admin.apps.length === 0) {
      admin.initializeApp();
    }

    const db = admin.firestore();

    return db;
  }

  protected getCollection(): admin.firestore.CollectionReference {
    const firestoreDb = this.getFirestoreDb();

    const collection = firestoreDb.collection(this.collectionName);

    return collection;
  }
}
