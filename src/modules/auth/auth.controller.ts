import { Request, Response } from 'express';
import { User } from '../users/users.model';
import { LoginRequest } from './auth.types';
import { loginUser } from './auth.services';


const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginRequest = req.body;
    const result = await loginUser(loginData);
    res.json(result);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || 'Error en el servidor';
    res.status(status).json({ message });
  }
};


export { login };