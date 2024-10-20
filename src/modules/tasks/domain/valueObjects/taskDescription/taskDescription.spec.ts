import { TaskDescription } from '@modules/tasks/domain/valueObjects/taskDescription/taskDescription';

describe('TaskDescription tests', () => {
  test('Should create description correctly', () => {
    const myTaskDescription = 'Debo ir a jugar futbol';

    const taskDescription = TaskDescription.build(myTaskDescription);

    expect(taskDescription).toBeDefined();
    expect(taskDescription.value).toBe(myTaskDescription);
  });
});
