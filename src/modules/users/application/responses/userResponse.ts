import { UserPrimitives } from '@modules/users/domain/user';

export type UserResponse = Omit<UserPrimitives, 'password'>;
