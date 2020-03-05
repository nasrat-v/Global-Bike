import { Request, Response } from 'express';

class UsersController {
  static me(request: Request, response: Response) {
    return response.json();
  }
}

export default UsersController;
