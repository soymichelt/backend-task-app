import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/tasks';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';
import { verifyAuthMiddleware } from '@modules/users/infrastructure/functions/middleware/auth/handler';
import { FindAllTasksController } from '@modules/tasks/infrastructure/functions/http/findAll/findAllTasksController';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const findAllTasksRouter = router();

findAllTasksRouter.get('/tasks', verifyAuthMiddleware, async (req: Request, res: Response) => {
  const controller = container.resolve<FindAllTasksController>('FindAllTasksController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
