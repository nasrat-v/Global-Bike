import { Request, Response } from 'express';

class AuthController {
  static login(request: Request, response: Response) {
    return response.status(200).json(request.body);
  }
  static register(request: Request, response: Response) {
    return response.status(201).json(request.body);
  }
}

export default AuthController;
