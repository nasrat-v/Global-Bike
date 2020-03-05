import { Application } from 'express';
import AuthController from '@src/controllers/AuthController';
import UsersController from '@src/controllers/UsersController';
import { authMiddleware } from '@src/middlewares';

export default function(app: Application) {
  app.post('/login', AuthController.login);

  app.post('/register', AuthController.register);

  app.get('/users/me', authMiddleware, UsersController.me);
}
