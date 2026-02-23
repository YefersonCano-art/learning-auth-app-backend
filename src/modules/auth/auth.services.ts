
import { response } from "express";
import { User } from "../users/users.model";
import { LoginRequest } from './auth.types';
import bcrypt from 'bcrypt';

export const loginUser = async (loginData: LoginRequest, res: any)  => {
  const { email, password } = loginData;
  
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }
  
  //Devolver datos
  return {
    message: 'Login exitoso',
    user: {
      id: user.id,
      email: user.email,
      nameUser: user.nameUser,
      name: user.name,
      lastName: user.lastName
    }
  };
};