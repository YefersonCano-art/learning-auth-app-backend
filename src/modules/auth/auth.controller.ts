import { Request, Response } from 'express';
import { User } from '../users/users.model';
import { LoginRequest } from './auth.types';
import { loginUser } from './auth.services';


const login = async (req: Request, res: Response) => {
  const loginData: LoginRequest = req.body;

   const result = await loginUser(loginData, res);
   res.json(result);

};


export { login };