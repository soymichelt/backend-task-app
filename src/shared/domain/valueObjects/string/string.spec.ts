import { StringValueObject } from '@shared/domain/valueObjects/string/string';

describe('String value object tests', () => {
  test('Should create a value object', () => {
    const request = 'String test';

    const string = StringValueObject.build(request);

    expect(string).toBeInstanceOf(StringValueObject);
    expect(string.value).toBe(request);
  });

  test('Should create a value object from an empty string', () => {
    const request = '';

    const string = StringValueObject.build(request);

    expect(string).toBeInstanceOf(StringValueObject);
    expect(string.value).toBe(request);
  });

  test('Should throw an exception when creating a value object from an invalid string', () => {
    const request: unknown = 123;

    expect(() => StringValueObject.build(request as string)).toThrow(
      'The value "123" of the argument "string" is invalid',
    );
  });

  test('Should compare two value objects', () => {
    const request = 'String test';

    const string = StringValueObject.build(request);
    const otherString = StringValueObject.build(request);

    expect(string.equals(otherString)).toBeTruthy();
  });

  test('Should compare two different value objects', () => {
    const string = StringValueObject.build('michel');
    const otherString = StringValueObject.build('trana');

    expect(string.equals(otherString)).toBeFalsy();
  });

  test('Should check if the value object is empty', () => {
    const request = '';

    const string = StringValueObject.build(request);

    expect(string.value).toEqual(request);
    expect(string.isEmpty()).toBeTruthy();
  });

  test('Should check if the value object is not empty', () => {
    const request = 'michel';

    const string = StringValueObject.build(request);

    expect(string.value).toEqual(request);
    expect(string.isEmpty()).toBeFalsy();
  });
});
