import type { Request } from 'express';

export interface IRequestUser extends Request {
  user: {
    id: number;
    name?: string;
    role?: string;
  };
}
