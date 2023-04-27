import { Role } from '@stock/db/types'
import { Request } from 'express';

export interface UserJwtPayload extends JwtPayload {
  userId: number;
  userRole: Role;
}
