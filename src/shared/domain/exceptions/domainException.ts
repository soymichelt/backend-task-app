type DomainExceptionPropsType = {
  name: string;
  message: string;
  status: number;
  code: string;
  errorType: 'warn' | 'error';
  metadata?: Record<string, any>;
};

type DomainExceptionPrimitivesType = DomainExceptionPropsType;

export class DomainException extends Error {
  readonly status: number;
  readonly code: string;
  readonly errorType: 'warn' | 'error';
  readonly metadata?: Record<string, any>;

  constructor(props: DomainExceptionPropsType) {
    super();

    const { name, message, status, code, errorType, metadata } = props;

    this.name = name;
    this.message = message;
    this.status = status;
    this.code = code;
    this.errorType = errorType;
    this.metadata = metadata;
  }

  public toPrimitives(): DomainExceptionPrimitivesType {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      errorType: this.errorType,
      metadata: this.metadata,
    };
  }
}
