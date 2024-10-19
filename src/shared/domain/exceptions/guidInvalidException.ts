import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class GuidInvalidException extends DomainException {
  constructor(value: string) {
    super({
      name: 'IdInvalidException',
      message: `The ID with value "${value}" is invalid`,
      status: 400,
      code: ERROR_CODES['GuidInvalidException'],
      errorType: 'error',
      metadata: { value },
    });
  }
}
