import { User } from '@src/models';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  try {
    if (!request.headers.authorization) {
      throw new Error();
    }
    const token: string = request.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(
      token,
      'dq6DyfbcfPouDZ8uKduWrFePdmzlh6vc',
    );
    const userId: any = decodedToken.userId;
    User.findOne({ where: { id: userId } })
      .then((value: User | null): void => {
        if (!value) {
          throw new Error();
        }
        request.body.user = value;
        next();
      })
      .catch((): void => {
        throw new Error();
      });
  } catch (e) {
    response.status(401).json();
  }
};

export { authMiddleware };
