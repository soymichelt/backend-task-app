import { Guid } from '@shared/domain/valueObjects/guid/guid';

export class UserId extends Guid {
  constructor(value: string) {
    super(value);
  }

  public static build(value: string): UserId {
    return new UserId(value);
  }

  public static newId(): UserId {
    const newId = super.newId().value;
    return this.build(newId);
  }

  protected override name(): string {
    return this.constructor.name;
  }
}
