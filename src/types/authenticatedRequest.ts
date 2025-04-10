import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    id: number
    userId: number
  };
}
