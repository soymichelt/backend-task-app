import { TaskDeadline } from '@modules/tasks/domain/valueObjects/taskDeadline/taskDeadline';

describe('TaskDeadline object tests', () => {
  test('Should create a value object', () => {
    const value = new Date();

    const valueObject = TaskDeadline.build(value);

    expect(valueObject.toString()).toBe(value.toISOString());
  });

  test('Should create a value object from string', () => {
    const value = new Date().toISOString();

    const valueObject = TaskDeadline.fromString(value);

    expect(valueObject.toString()).toBe(value);
  });

  test('Should throw an exception when creating a value object from an invalid string', () => {
    const value = 'invalid date';

    expect(() => TaskDeadline.fromString(value)).toThrow(`The date value "invalid date" is invalid`);
  });
});
