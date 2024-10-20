import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';

describe('UserEmail tests', () => {
  test('Should create email correctly', () => {
    const myEmail = 'mtraatabladaa94@gmail.com';

    const userEmail = UserEmail.build(myEmail);

    expect(userEmail).toBeDefined();
    expect(userEmail).toBeInstanceOf(UserEmail);
    expect(userEmail.value).toBe(myEmail);
  });

  test('Should throw invalid email exception', () => {
    const myInvalidEmail = 'mtraatabladaa94#gmail.com';

    expect(() => UserEmail.build(myInvalidEmail)).toThrow('The email "mtraatabladaa94#gmail.com" is invalid');
  });
});
