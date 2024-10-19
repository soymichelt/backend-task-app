import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class InvalidDateException extends DomainException {
  constructor(value: string) {
    super({
      name: 'InvalidDateException',
      message: `The date value "${value}" is invalid`,
      status: 400,
      code: ERROR_CODES['InvalidDateException'],
      errorType: 'error',
      metadata: { value },
    });
  }
}
