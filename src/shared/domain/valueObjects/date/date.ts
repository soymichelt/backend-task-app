import { InvalidDateException } from '@shared/domain/exceptions/invalidDateException';

export class DateValueObject {
  readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static build(value: Date): DateValueObject {
    return new DateValueObject(value);
  }

  public static fromString(value: string): DateValueObject {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new InvalidDateException(value);
    }

    return new DateValueObject(date);
  }

  public static now(): DateValueObject {
    const date = new Date();
    return new DateValueObject(date);
  }

  public equals(otherDate: DateValueObject): boolean {
    if (!otherDate) return false;

    const localDateParsed = Date.parse(this.toString());
    const otherDateParsed = Date.parse(otherDate.toString());
    return localDateParsed === otherDateParsed;
  }

  public getTime(): number {
    return this.value.getTime();
  }

  public getDifferenceInMin(date: DateValueObject): number {
    const differenceInMilliseconds = Math.abs(this.getTime() - date.getTime());
    return Math.floor(differenceInMilliseconds / (1000 * 60));
  }

  public toString(): string {
    return this.value.toISOString();
  }
}
