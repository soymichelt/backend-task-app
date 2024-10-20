import * as admin from 'firebase-admin';
import { Router as router, Request, Response } from 'express';
import { container } from '@di/modules/users';
import { CreateUserController } from '@modules/users/infrastructure/functions/http/create/createUserController';
import { DEFAULT_HEADERS } from '@shared/infrastructure/controllers/headers/defaultHeaders';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const createUserRouter = router();

createUserRouter.post('/users', async (req: Request, res: Response) => {
  const controller = container.resolve<CreateUserController>('CreateUserController');
  const result = await controller.execute(req);

  res.set(DEFAULT_HEADERS);
  res.status(result.statusCode).json(result);
});
