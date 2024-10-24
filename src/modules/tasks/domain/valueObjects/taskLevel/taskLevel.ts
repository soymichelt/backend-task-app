import { EnumValueObject } from '@shared/domain/valueObjects/enum/enum';

export enum TaskLevelEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

const TASK_LEVEL_VALUES = Object.values(TaskLevelEnum);

export class TaskLevel extends EnumValueObject<TaskLevelEnum> {
  private constructor(value: TaskLevelEnum) {
    super(value, TASK_LEVEL_VALUES);
  }

  public static build(value: TaskLevelEnum): TaskLevel {
    return new TaskLevel(value);
  }

  public static fromString(value: string): TaskLevel {
    return this.build(value as TaskLevelEnum);
  }

  public static default(): TaskLevel {
    return this.build(TaskLevelEnum.LOW);
  }

  public isLow(): boolean {
    return this.value === TaskLevelEnum.LOW;
  }

  public isMedium(): boolean {
    return this.value === TaskLevelEnum.MEDIUM;
  }

  public isHigh(): boolean {
    return this.value === TaskLevelEnum.HIGH;
  }
}
