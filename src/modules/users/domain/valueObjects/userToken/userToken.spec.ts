import { UserToken } from '@modules/users/domain/valueObjects/userToken/userToken';

describe('UserToken tests', () => {
  test('Should create token correctly', () => {
    const myToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const userToken = UserToken.build(myToken);

    expect(userToken).toBeDefined();
    expect(userToken.value).toBe(myToken);
  });

  test('Should throw UserTokenRequiredException', () => {
    const myToken = undefined as unknown as string;

    expect(() => {
      UserToken.build(myToken);
    }).toThrow('User token required');
  });
});
