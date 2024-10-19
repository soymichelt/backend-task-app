import { injectable } from 'tsyringe';
import { Request } from 'express';
import { RequestParserController } from '@shared/infrastructure/controllers/requests/requestParserController';

@injectable()
export class FcfHttpV2RequestParserController implements RequestParserController {
  match(event: Request, context: any): boolean {
    return !context && typeof event.method === 'string' && typeof event.url === 'string';
  }

  public async parseRequest<T>(event: Request): Promise<T> {
    return Promise.resolve({
      headers: this.getHeaders(event),
      cookies: this.getCookies(event),
      user: this.getAuthenticatedUser(event),
      ...(event.query || {}),
      ...(event.params || {}),
      ...(event.body || {}),
    } as T);
  }

  private getAuthenticatedUser(event: Request | any): Record<string, any> | undefined {
    if (!event.user) return;

    return event.user;
  }

  private getHeaders(event: Request): Record<string, any> {
    if (!event.headers) return {};

    return { ...event.headers };
  }

  private getCookies(event: Request): Record<string, any> {
    const cookies = event.headers.cookie;
    if (!cookies) return {};

    const parsedCookies = cookies.split(';').reduce(
      (acc, item) => {
        const [cookie, value] = item.split('=');
        acc[cookie] = value;
        return acc;
      },
      {} as Record<string, any>,
    );

    return parsedCookies;
  }
}
