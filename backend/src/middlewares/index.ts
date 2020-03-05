import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@src/models';
import { AuthRequest } from '@src/typings/express';

const authMiddleware = (
  request: AuthRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(
      token,
      'dq6DyfbcfPouDZ8uKduWrFePdmzlh6vc',
    );
    const userId = decodedToken.userId;
    User.findOne({ where: { id: userId } })
      .then(value => {
        request.user = value;
        next();
      })
      .catch(() => {
        throw new Error();
      });
  } catch (e) {
    response.status(401).json({ e });
  }
};

export { authMiddleware };
