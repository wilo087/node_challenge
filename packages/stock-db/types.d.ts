export type Role = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  role?: Role;
  password?: string;
  history?: UserHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserHistory {
  id: number;
  name: string;
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  user: number;
  userId: number;
  date: number;
}

export type UserCreateInput = Pick<User, 'email' | 'role'>;
export type UserReturnInput = Pick<User, 'email' | 'password'>;
// export type UserReturnInput = Omit<User, 'id' | 'role'>;
