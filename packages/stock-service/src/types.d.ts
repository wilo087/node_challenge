import { Role } from '@stock/db/types';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number} | JwtPayload | string;
  userRole?: Role;
}

