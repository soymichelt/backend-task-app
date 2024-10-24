import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

describe('UserId tests', () => {
  test('Should create user id correctly', () => {
    const myUserId = 'b02e5447-6a27-4cc2-93e6-0dcd9d7f9888';

    const userId = UserId.build(myUserId);

    expect(userId).toBeDefined();
    expect(userId.value).toBe(myUserId);
  });

  test('Should return UserId as field name', () => {
    const myUserId = 'b02e5447-6a27-4cc2-93e6-0dcd9d7f9888';
    const userId = UserId.build(myUserId);

    // @ts-ignore: Protected method
    const fieldName = userId.name();

    expect(fieldName).toEqual('UserId');
  });
});
