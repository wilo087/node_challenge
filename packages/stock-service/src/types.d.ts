import { Role } from '@stock/db/types';
import { Request } from 'express';

export interface UserJwtPayload extends JwtPayload {
  userId?: string;
  userRole: Role;
}

export interface AuthenticatedRequest extends Request {
  user?: UserJwtPayload;
}
