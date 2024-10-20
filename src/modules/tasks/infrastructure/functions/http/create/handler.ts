import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/users';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';
import { verifyAuthMiddleware } from '@modules/users/infrastructure/functions/middleware/auth/handler';
import { CreateTaskController } from '@modules/tasks/infrastructure/functions/http/create/createTaskController';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const createTaskRouter = router();

createTaskRouter.post('/tasks', verifyAuthMiddleware, async (req: Request, res: Response) => {
  const controller = container.resolve<CreateTaskController>('CreateTaskController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
