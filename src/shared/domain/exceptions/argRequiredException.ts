import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class ArgRequiredException extends DomainException {
  constructor(args: string | string[], status = 500) {
    super({
      name: 'ArgRequiredException',
      message: `The following arguments are required: ${typeof args === 'string' ? args : args.join(', ')}`,
      status: status ?? 500,
      code: ERROR_CODES['ArgRequiredException'],
      errorType: 'error',
    });
  }
}
