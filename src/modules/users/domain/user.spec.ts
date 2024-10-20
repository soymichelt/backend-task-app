import { User, UserPrimitives, UserProps } from '@modules/users/domain/user';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { UserPassword } from '@modules/users/domain/valueObjects/userPassword/userPassword';

describe('User aggregate root tests', () => {
  test('Should create user', () => {
    const userData: UserProps = {
      userId: UserId.build('3eb89ae8-5512-4c49-b43b-4d0e1c952aa3'),
      email: UserEmail.build('mtraatabladaa94@gmail.com'),
      password: UserPassword.build('MyPass123*'),
    };

    const user = User.build(userData);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.toPrimitives()).toEqual({
      userId: '3eb89ae8-5512-4c49-b43b-4d0e1c952aa3',
      email: 'mtraatabladaa94@gmail.com',
      password: 'MyPass123*',
    });
  });

  test('Should create user from primitives', () => {
    const userData: UserPrimitives = {
      userId: '3eb89ae8-5512-4c49-b43b-4d0e1c952aa3',
      email: 'mtraatabladaa94@gmail.com',
      password: 'MyPass123*',
    };

    const user = User.fromPrimitives(userData);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.toPrimitives()).toEqual({
      userId: '3eb89ae8-5512-4c49-b43b-4d0e1c952aa3',
      email: 'mtraatabladaa94@gmail.com',
      password: 'MyPass123*',
    });
  });
});
