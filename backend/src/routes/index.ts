import { Application } from 'express';
import AuthController from '@src/controllers/AuthController';
import UsersController from '@src/controllers/UsersController';

export default function(app: Application) {
  app.post('/login', AuthController.login);

  app.post('/register', AuthController.register);

  app.get('/users/me', UsersController.me);
}
