import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/users';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';
import { verifyAuthMiddleware } from '@modules/users/infrastructure/functions/middleware/auth/handler';
import { UpdateTaskController } from '@modules/tasks/infrastructure/functions/http/update/updateTaskController';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const updateTaskRouter = router();

updateTaskRouter.patch('/tasks/:taskId', verifyAuthMiddleware, async (req: Request, res: Response) => {
  const controller = container.resolve<UpdateTaskController>('UpdateTaskController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
