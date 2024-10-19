import FunctionLogger from 'firebase-functions/logger';
import { Logger } from '@shared/domain/loggers/logger';
import { injectable } from 'tsyringe';

@injectable()
export class FirebaseLogger implements Logger {
  public debug(message: string | Record<string, unknown>): void {
    FunctionLogger.debug(message);
  }

  public info(message: string | Record<string, unknown>): void {
    FunctionLogger.info(message);
  }

  public error(message: string | Record<string, unknown>): void {
    FunctionLogger.error(message);
  }

  public warn(message: string | Record<string, unknown>): void {
    FunctionLogger.warn(message);
  }
}
