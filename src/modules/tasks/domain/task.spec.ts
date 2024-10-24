/* eslint-disable max-lines-per-function */
import { Task, TaskPrimitives, TaskProps } from '@modules/tasks/domain/task';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { TaskTitle } from '@modules/tasks/domain/valueObjects/taskTitle/taskTitle';
import { TaskDescription } from '@modules/tasks/domain/valueObjects/taskDescription/taskDescription';
import { TaskStatus } from '@modules/tasks/domain/valueObjects/taskStatus/taskStatus';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { TaskDeadline } from '@modules/tasks/domain/valueObjects/taskDeadline/taskDeadline';
import { TaskLevel } from '@modules/tasks/domain/valueObjects/taskLevel/taskLevel';

describe('Task aggregate root tests', () => {
  test('Should create task', () => {
    const taskData: TaskProps = {
      taskId: TaskId.build('c6b23e9f-a1da-4316-97cc-bf11079a1c45'),
      title: TaskTitle.build('Ir al gym'),
      description: TaskDescription.build('Debo ir al gym a las 8'),
      deadline: TaskDeadline.build(new Date()),
      status: TaskStatus.default(),
      level: TaskLevel.default(),
      userId: UserId.build('30bdc421-d04e-4bf9-a9ca-c737cb9d7da8'),
    };

    const task = Task.build(taskData);

    expect(task).toBeDefined();
    expect(task).toBeInstanceOf(Task);
    expect(task.toPrimitives()).toEqual({
      taskId: 'c6b23e9f-a1da-4316-97cc-bf11079a1c45',
      title: 'Ir al gym',
      description: 'Debo ir al gym a las 8',
      deadline: expect.any(String),
      status: 'TODO',
      level: 'LOW',
      userId: '30bdc421-d04e-4bf9-a9ca-c737cb9d7da8',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('Should create task from primitives', () => {
    const taskData: TaskPrimitives = {
      taskId: 'c6b23e9f-a1da-4316-97cc-bf11079a1c45',
      title: 'Ir al gym',
      description: 'Debo ir al gym a las 8',
      deadline: new Date().toISOString(),
      status: 'TODO',
      level: 'MEDIUM',
      userId: '30bdc421-d04e-4bf9-a9ca-c737cb9d7da8',
    };

    const task = Task.fromPrimitives(taskData);

    expect(task).toBeDefined();
    expect(task).toBeInstanceOf(Task);
    expect(task.toPrimitives()).toEqual({
      taskId: 'c6b23e9f-a1da-4316-97cc-bf11079a1c45',
      title: 'Ir al gym',
      description: 'Debo ir al gym a las 8',
      deadline: expect.any(String),
      status: 'TODO',
      level: 'MEDIUM',
      userId: '30bdc421-d04e-4bf9-a9ca-c737cb9d7da8',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
