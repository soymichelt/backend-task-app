import { DateValueObject } from '@shared/domain/valueObjects/date/date';

describe('Date value object tests', () => {
  test('Should create a value object', () => {
    const value = new Date();

    const valueObject = DateValueObject.build(value);

    expect(valueObject.toString()).toBe(value.toISOString());
  });

  test('Should create a value object from string', () => {
    const value = new Date().toISOString();

    const valueObject = DateValueObject.fromString(value);

    expect(valueObject.toString()).toBe(value);
  });

  test('Should throw an exception when creating a value object from an invalid string', () => {
    const value = 'invalid date';

    expect(() => DateValueObject.fromString(value)).toThrow(`The date value "invalid date" is invalid`);
  });

  test(`Should create a value object with today's date`, () => {
    const valueObject = DateValueObject.now();

    expect(valueObject).toBeDefined();
  });

  test('Should compare two value objects', () => {
    const value = new Date();

    const valueObject = DateValueObject.build(value);
    const otherValueObject = DateValueObject.build(value);

    expect(valueObject.equals(otherValueObject)).toBeTruthy();
  });

  test('Should compare two different value objects', () => {
    const valueObject = DateValueObject.fromString('12/31/2021');
    const otherValueObject = DateValueObject.fromString('12/30/2021');

    expect(valueObject.equals(otherValueObject)).toBeFalsy();
  });

  test('Should return 2 minutes when comparing dates', () => {
    const date = DateValueObject.fromString('2021-12-31T23:56:00.000Z');
    const otherDate = DateValueObject.fromString('2021-12-31T23:58:00.000Z');

    const result = date.getDifferenceInMin(otherDate);

    return expect(result).toBe(2);
  });
});
