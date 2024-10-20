import { EnumValueObject } from '@shared/domain/valueObjects/enum/enum';

export enum TaskStatusEnum {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  TEST = 'TEST',
  ON_HOLD = 'ON_HOLD',
  DONE = 'DONE',
}

const TASK_STATUS_VALUES = Object.values(TaskStatusEnum);

export class TaskStatus extends EnumValueObject<TaskStatusEnum> {
  private constructor(value: TaskStatusEnum) {
    super(value, TASK_STATUS_VALUES);
  }

  public static build(value: TaskStatusEnum): TaskStatus {
    return new TaskStatus(value);
  }

  public static fromString(value: string): TaskStatus {
    return this.build(value as TaskStatusEnum);
  }

  public static default(): TaskStatus {
    return this.build(TaskStatusEnum.TODO);
  }

  public isTodo(): boolean {
    return this.value === TaskStatusEnum.TODO;
  }

  public inProgress(): boolean {
    return this.value === TaskStatusEnum.IN_PROGRESS;
  }

  public isTest(): boolean {
    return this.value === TaskStatusEnum.TEST;
  }

  public isOnHold(): boolean {
    return this.value === TaskStatusEnum.ON_HOLD;
  }

  public isDone(): boolean {
    return this.value === TaskStatusEnum.DONE;
  }
}
