import { UserPassword } from '@modules/users/domain/valueObjects/userPassword/userPassword';

describe('UserPassword tests', () => {
  test('Should create password correctly', () => {
    const myPassword = 'MiPass123*';

    const userPassword = UserPassword.build(myPassword);

    expect(userPassword).toBeDefined();
    expect(userPassword.value).toBe(myPassword);
  });
});
