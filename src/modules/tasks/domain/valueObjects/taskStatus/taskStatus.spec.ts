import { TaskStatus, TaskStatusEnum } from '@modules/tasks/domain/valueObjects/taskStatus/taskStatus';

describe('TaskStatus tests', () => {
  test('Should create task status', () => {
    const myStatus = TaskStatusEnum.TODO;

    const status = TaskStatus.build(myStatus);

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskStatus);
    expect(status.value).toBe('TODO');
  });

  test('Should create default task status', () => {
    const status = TaskStatus.default();

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskStatus);
    expect(status.value).toBe('TODO');
  });

  test('Should create task status from string', () => {
    const myStatus = 'IN_PROGRESS';

    const status = TaskStatus.fromString(myStatus);

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskStatus);
    expect(status.value).toBe('IN_PROGRESS');
  });

  test('Should create task status', () => {
    const myStatus = TaskStatusEnum.DONE;

    const status = TaskStatus.build(myStatus);

    expect(status).toBeDefined();
    expect(status).toBeInstanceOf(TaskStatus);
    expect(status.value).toBe('DONE');
  });
});
