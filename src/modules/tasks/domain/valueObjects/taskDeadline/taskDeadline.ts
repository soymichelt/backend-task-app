import { ArgInvalidException } from '@shared/domain/exceptions/argInvalidException';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { InvalidDateException } from '@shared/domain/exceptions/invalidDateException';
import { DateValueObject } from '@shared/domain/valueObjects/date/date';

export class TaskDeadline extends DateValueObject {
  private constructor(value: Date) {
    super(value);

    this.validate(value);
  }

  public static build(value: Date): TaskDeadline {
    return new TaskDeadline(value);
  }

  public static fromString(value: string): TaskDeadline {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new InvalidDateException(value);
    }

    return new TaskDeadline(date);
  }

  protected override validate(value: Date): void {
    if (!value) {
      throw new ArgRequiredException('task deadline', 400);
    }

    if (!(value instanceof Date)) {
      throw new ArgInvalidException('task deadline', 'NOT A DATE', 400);
    }
  }
}
