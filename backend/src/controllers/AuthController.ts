import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@models/user';

class AuthController {
  static login(request: Request, response: Response) {
    User.authenticate(request.body.email, request.body.password)
      .then(value => {
        const payload = { id: value.id };
        const token = jwt.sign(payload, 'wowwow');
        return response.status(200).json({ jwt: token });
      })
      .catch(_error => {
        return response.status(401).json();
      });
  }
  static register(request: Request, response: Response) {
    User.create<User>({
      email: request.body.email,
      password: request.body.password,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    })
      .then(() => {
        return response.status(201).json();
      })
      .catch(error => {
        throw error;
      });
  }
}

export default AuthController;
