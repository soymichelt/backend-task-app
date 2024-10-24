import { TaskLevel, TaskLevelEnum } from '@modules/tasks/domain/valueObjects/taskLevel/taskLevel';

describe('TaskLevel tests', () => {
  test('Should create task status', () => {
    const myStatus = TaskLevelEnum.LOW;

    const status = TaskLevel.build(myStatus);

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskLevel);
    expect(status.value).toBe('LOW');
  });

  test('Should create default task status', () => {
    const status = TaskLevel.default();

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskLevel);
    expect(status.value).toBe('LOW');
  });

  test('Should create task status from string', () => {
    const myStatus = 'MEDIUM';

    const status = TaskLevel.fromString(myStatus);

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskLevel);
    expect(status.value).toBe('MEDIUM');
  });

  test('Should create task status', () => {
    const myStatus = TaskLevelEnum.HIGH;

    const status = TaskLevel.build(myStatus);

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskLevel);
    expect(status.value).toBe('HIGH');
  });
});
