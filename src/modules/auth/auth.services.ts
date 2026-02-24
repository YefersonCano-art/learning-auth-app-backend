
import { response } from "express";
import { User } from "../users/users.model";
import { LoginRequest } from './auth.types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (loginData: LoginRequest)  => {
  const { email, password } = loginData;
  
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 404, message: 'Usuario no encontrado' };
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: 'Contraseña incorrecta' };
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '24h' } 
  );
  
  //Devolver datos
  return {
    message: 'Login exitoso',
    token, 
    user: {
      id: user.id,
      email: user.email,
      nameUser: user.nameUser,
      name: user.name,
      lastName: user.lastName
    }
  };
};