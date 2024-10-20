import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class EmailIsInvalidException extends DomainException {
  constructor(email: string) {
    super({
      name: 'EmailIsInvalidException',
      message: `The email "${email}" is invalid`,
      status: 500,
      code: ERROR_CODES['EmailIsInvalidException'],
      errorType: 'error',
      metadata: { email },
    });
  }
}
