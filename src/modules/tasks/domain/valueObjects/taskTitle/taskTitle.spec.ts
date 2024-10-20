import { TaskTitle } from '@modules/tasks/domain/valueObjects/taskTitle/taskTitle';

describe('TaskTitle tests', () => {
  test('Should create title correctly', () => {
    const myTaskTitle = 'Hacer ejercicio';

    const taskTitle = TaskTitle.build(myTaskTitle);

    expect(taskTitle).toBeDefined();
    expect(taskTitle.value).toBe(myTaskTitle);
  });
});
