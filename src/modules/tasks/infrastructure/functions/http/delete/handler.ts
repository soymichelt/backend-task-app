import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/users';
import { verifyAuthMiddleware } from '@modules/users/infrastructure/functions/middleware/auth/handler';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';
import { DeleteTaskController } from '@modules/tasks/infrastructure/functions/http/delete/deleteTaskController';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const deleteTaskRouter = router();

deleteTaskRouter.delete('/tasks/:taskId', verifyAuthMiddleware, async (req: Request, res: Response) => {
  const controller = container.resolve<DeleteTaskController>('DeleteTaskController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
