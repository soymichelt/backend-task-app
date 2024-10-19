import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class EnumValueIsInvalidException extends DomainException {
  constructor(value: any, items: any[]) {
    super({
      name: 'EnumValueIsInvalidException',
      message: `The enum "${value}" value is valid. Allowed values: "${items.join(', ')}"`,
      status: 500,
      code: ERROR_CODES['EnumValueIsInvalidException'],
      errorType: 'error',
    });
  }
}
