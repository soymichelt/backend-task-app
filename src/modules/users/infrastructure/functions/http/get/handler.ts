import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/users';
import { verifyAuthMiddleware } from '@modules/users/infrastructure/functions/middleware/auth/handler';
import { GetUserController } from '@modules/users/infrastructure/functions/http/get/getUserController';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const getUserRouter = router();

getUserRouter.get('/users', verifyAuthMiddleware, async (req: Request, res: Response) => {
  const controller = container.resolve<GetUserController>('GetUserController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
