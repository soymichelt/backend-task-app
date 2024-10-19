import { ArgInvalidException } from '@shared/domain/exceptions/argInvalidException';

export class StringValueObject {
  readonly value: string;

  protected constructor(value: string) {
    this.value = value;

    this.validate(value);
  }

  public static build(value: string): StringValueObject {
    return new StringValueObject(value);
  }

  public isEmpty(): boolean {
    return !this.value;
  }

  public equals(other: StringValueObject): boolean {
    if (!other) return false;

    return this.value === other.value;
  }

  protected validate(value: string): void {
    if (typeof value !== 'string') {
      throw new ArgInvalidException('string', value);
    }
  }
}
