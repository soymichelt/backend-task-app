import { UserResponse } from '@modules/users/application/responses/userResponse';

export type UserCreatedResponse = UserResponse & {
  token: string;
};
