import { Request } from 'express';
import User from '@models/user';

export interface AuthRequest extends Request {
  user: User;
}
