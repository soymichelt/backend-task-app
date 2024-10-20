import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';

describe('TaskId tests', () => {
  test('Should create task id correctly', () => {
    const myTaskId = 'b02e5447-6a27-4cc2-93e6-0dcd9d7f9888';

    const taskId = TaskId.build(myTaskId);

    expect(taskId).toBeDefined();
    expect(taskId.value).toBe(myTaskId);
  });
});
