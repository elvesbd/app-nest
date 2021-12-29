import { Request } from 'express';
import { IUser } from 'src/users/infra/interfaces';

export interface RequestWitUser extends Request {
  user: IUser;
}
