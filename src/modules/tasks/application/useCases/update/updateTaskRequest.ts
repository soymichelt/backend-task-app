export type UpdateTaskRequest = {
  taskId: string;

  title: string;
  description: string;
  deadline: string;
  status: string;
  level: string;
};
