import User from '@models/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthController {
  public static login(request: Request, response: Response): void {
    User.authenticate(request.body.email, request.body.password)
      .then(
        (value: User | null): Response => {
          if (value === null) {
            throw new Error();
          }
          const payload = { userId: value.id };
          const token = jwt.sign(payload, 'dq6DyfbcfPouDZ8uKduWrFePdmzlh6vc');

          return response.status(200).json({ jwt: token });
        },
      )
      .catch((): Response => response.status(401).json());
  }
  public static register(request: Request, response: Response): void {
    User.create<User>({
      email: request.body.email,
      password: request.body.password,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    })
      .then((): Response => response.status(201).json())
      .catch((error): any => {
        throw error;
      });
  }
}

export default AuthController;
