import { Response } from 'express';
import { AuthRequest } from '@src/typings/express';

class UsersController {
  static me(request: AuthRequest, response: Response) {
    return response.json(request.user);
  }
}

export default UsersController;
