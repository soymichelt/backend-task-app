import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { Task } from '@modules/tasks/domain/task';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { FirestoreRepository } from '@shared/infrastructure/repositories/firestore/firestoreRepository';
import { injectable } from 'tsyringe';

@injectable()
export class FirestoreTaskRepository extends FirestoreRepository<Task> implements TaskRepository {
  private static TASK_COLLECTION_NAME = 'tasks';

  constructor() {
    super({
      collectionName: FirestoreTaskRepository.TASK_COLLECTION_NAME,
    });
  }

  public async save(task: Task): Promise<void> {
    await this.persist(task);
  }

  public async remove(task: Task): Promise<void> {
    await this.delete(task);
  }

  public async find(taskId: TaskId, userId: UserId): Promise<Task | undefined> {
    const task = await this.get(taskId.value);
    if (!task || !task.userId.equals(userId)) return;

    return task;
  }

  public async findAll(userId: UserId): Promise<Task[]> {
    const collection = this.getCollection();

    const query = await collection.where('userId', '==', userId.value).get();
    if (query.empty) return [];

    const promises = query.docs.map(async (doc) => {
      const task = await this.mapToEntity(doc.data());

      return task;
    });

    const tasks = Promise.all(promises);
    return tasks;
  }

  protected getPrimaryKey(entity: Task): string {
    return entity.taskId.value;
  }

  protected mapToEntity(primitives: any): Promise<Task> {
    const task = Promise.resolve(Task.fromPrimitives(primitives));

    return task;
  }
}
