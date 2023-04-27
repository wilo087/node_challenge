export type Role = 'admin' | 'user'

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
  open: number;
  high: number;
  low: number;
  close: number;
  user: number;
  userId: number;
  date: Date;
}

export interface UserStatsResponse {
  stock: string;
  times_requested: number;
}

export type UserCreateInput = Pick<User, 'email' | 'role'>
export type UserReturnInput = Pick<User, 'email' | 'password'>
export type UserHistoryResponse = Omit<UserHistory, 'id' | 'userId' | 'user'>
