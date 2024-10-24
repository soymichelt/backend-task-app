import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class ArgInvalidException extends DomainException {
  constructor(label: string, value?: any, status: number = 500) {
    super({
      name: 'ArgInvalidException',
      message: `The value "${value}" of the argument "${label}" is invalid`,
      status: status ?? 500,
      code: ERROR_CODES['ArgInvalidException'],
      errorType: 'error',
    });
  }
}
