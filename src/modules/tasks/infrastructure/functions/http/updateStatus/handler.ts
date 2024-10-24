import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/users';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';
import { verifyAuthMiddleware } from '@modules/users/infrastructure/functions/middleware/auth/handler';
import { UpdateStatusTaskController } from '@modules/tasks/infrastructure/functions/http/updateStatus/updateStatusTaskController';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const updateStatusTaskRouter = router();

updateStatusTaskRouter.patch('/tasks/:taskId/status', verifyAuthMiddleware, async (req: Request, res: Response) => {
  const controller = container.resolve<UpdateStatusTaskController>('UpdateStatusTaskController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
