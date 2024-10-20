import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { TaskTitle } from '@modules/tasks/domain/valueObjects/taskTitle/taskTitle';
import { TaskDescription } from '@modules/tasks/domain/valueObjects/taskDescription/taskDescription';
import { TaskStatus } from '@modules/tasks/domain/valueObjects/taskStatus/taskStatus';
import { DateValueObject } from '@shared/domain/valueObjects/date/date';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

export type TaskProps = {
  taskId: TaskId;
  title: TaskTitle;
  description: TaskDescription;
  status: TaskStatus;
  userId: UserId;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type TaskPrimitives = {
  taskId: string;
  title: string;
  description: string;
  status: string;
  userId: string;

  createdAt?: string;
  updatedAt?: string;
};

export class Task extends AggregateRoot {
  private _taskId: TaskId;
  private _title: TaskTitle;
  private _description: TaskDescription;
  private _status: TaskStatus;
  private _userId: UserId;

  private constructor(props: TaskProps) {
    super();

    this._taskId = props.taskId;
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._userId = props.userId;

    this.createdAt = props.createdAt || DateValueObject.now();
    this.updatedAt = props.updatedAt || DateValueObject.now();
  }

  public static build(props: TaskProps): Task {
    return new Task(props);
  }

  public static fromPrimitives(props: TaskPrimitives): Task {
    return this.build({
      taskId: TaskId.build(props.taskId),
      title: TaskTitle.build(props.title),
      description: TaskDescription.build(props.description),
      status: TaskStatus.fromString(props.status),
      userId: UserId.build(props.userId),

      createdAt: props.createdAt ? DateValueObject.fromString(props.createdAt) : undefined,
      updatedAt: props.updatedAt ? DateValueObject.fromString(props.updatedAt) : undefined,
    });
  }

  public get taskId(): TaskId {
    return this._taskId;
  }

  public get title(): TaskTitle {
    return this._title;
  }

  public get description(): TaskDescription {
    return this._description;
  }

  public get status(): TaskStatus {
    return this._status;
  }

  public update(props: Omit<TaskProps, 'taskId' | 'userId'>): void {
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;

    this.updatedAt = DateValueObject.now();
  }

  public toPrimitives(): TaskPrimitives {
    return {
      taskId: this._taskId.value,
      title: this._title.value,
      description: this._description.value,
      status: this._status.value,
      userId: this._userId.value,

      createdAt: this.createdAt?.toString(),
      updatedAt: this.updatedAt?.toString(),
    };
  }
}