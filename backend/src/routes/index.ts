import { Application } from 'express';
import AuthController from '../controllers/AuthController';

export default function(app: Application) {
  app.post('/login', AuthController.login);

  app.post('/register', AuthController.register);
}
