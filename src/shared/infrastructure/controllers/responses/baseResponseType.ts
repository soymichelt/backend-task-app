export type BaseResponseType = {
  [key: string]: any;

  statusCode: number;
  body?: Record<string, any> | any;
};
