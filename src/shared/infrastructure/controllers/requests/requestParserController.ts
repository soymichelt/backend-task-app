export interface RequestParserController {
  match(event: any, context: any): boolean;
  parseRequest<T>(event: any, context?: any): Promise<T>;
}
