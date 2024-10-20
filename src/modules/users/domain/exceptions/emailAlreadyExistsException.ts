import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class EmailAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super({
      name: 'EmailAlreadyExistsException',
      message: 'There is already a user with this email',
      status: 500,
      code: ERROR_CODES['EmailAlreadyExistsException'],
      errorType: 'error',
      metadata: { email },
    });
  }
}
