import * as admin from 'firebase-admin';
import { container } from '@di/modules/users';
import { NextFunction, Request, Response } from 'express';
import { VerifyUserTokenController } from '@modules/users/infrastructure/functions/middleware/auth/verifyUserTokenController';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const verifyAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const controller = container.resolve<VerifyUserTokenController>('VerifyUserTokenController');
  const result = await controller.execute(req);

  if (result.statusCode >= 400 && result.statusCode <= 599) {
    res.status(result.statusCode).json(result);
  }

  (req as any).user = result.body;

  next();
};
