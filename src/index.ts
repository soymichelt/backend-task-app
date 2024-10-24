import * as functions from 'firebase-functions/v2';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'reflect-metadata';

import { getUserRouter } from '@modules/users/infrastructure/functions/http/get/handler';
import { createUserRouter } from '@modules/users/infrastructure/functions/http/create/handler';

import { createTaskRouter } from '@modules/tasks/infrastructure/functions/http/create/handler';
import { updateTaskRouter } from '@modules/tasks/infrastructure/functions/http/update/handler';
import { updateStatusTaskRouter } from '@modules/tasks/infrastructure/functions/http/updateStatus/handler';
import { deleteTaskRouter } from '@modules/tasks/infrastructure/functions/http/delete/handler';
import { findAllTasksRouter } from '@modules/tasks/infrastructure/functions/http/findAll/handler';

const app = express();

// Enable cors
app.use(cors({ origin: true }));

// Enable helmet
app.use(helmet());

// Enable rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
  handler: (_: Request, res: Response) => {
    res.status(429).json({
      statusCode: 429,
      body: {
        message: 'Se ha superado el límite permitido de solicitudes por minuto',
      },
    });
  },
});
app.use(limiter);

app.use(getUserRouter);
app.use(createUserRouter);

app.use(createTaskRouter);
app.use(updateTaskRouter);
app.use(updateStatusTaskRouter);
app.use(deleteTaskRouter);
app.use(findAllTasksRouter);

export const api = functions.https.onRequest(app);
