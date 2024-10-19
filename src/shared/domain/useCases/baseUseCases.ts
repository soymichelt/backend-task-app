export abstract class BaseUseCase<RequestType, ResponseType> {
  abstract run(request: RequestType): Promise<ResponseType>;
}
