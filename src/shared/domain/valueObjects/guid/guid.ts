import { GuidInvalidException } from '@shared/domain/exceptions/guidInvalidException';
import { v4, validate } from 'uuid';

export class Guid {
  readonly value: string;

  protected constructor(value: string) {
    this.value = value;

    this.validate(value);
  }

  public static build(value: string): Guid {
    return new Guid(value);
  }

  public static newId(): Guid {
    const generatedId = v4();
    return new Guid(generatedId);
  }

  public equals(other: Guid): boolean {
    if (!other) return false;

    return this.value === other.value;
  }

  public toString(): string {
    return this.value.toString();
  }

  protected validate(value: string): void {
    if (!validate(value)) {
      throw new GuidInvalidException(this.name(), value);
    }
  }

  protected name(): string {
    return this.constructor.name;
  }
}
