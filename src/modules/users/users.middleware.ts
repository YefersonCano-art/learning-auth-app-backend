import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { User } from './users.model';

// Esquema de validación para el registro de usuarios
const userSchema = z.object({
  nameUser: z.string({ message: "El nombre de usuario es requerido" }).min(2, "Ingresa tu nombre de usuario."),
  name: z.string({ message: "El nombre es requerido" }).min(2, "Ingresa tus nombres."),
  lastName: z.string({ message: "El apellido es requerido" }).min(2, "Ingresa tus apellidos."),
  email: z.email({ message: "Ingresa un correo válido" }).refine(
    async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      return !existingUser;
    },
    { message: "El correo electrónico ya está registrado" }
  ),
  password: z.string({ message: "La contraseña es requerida" }).min(6, "Mínimo 6 caracteres"),
});

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body || {};
    await userSchema.parseAsync(body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.issues.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    res.status(500).json({ error: 'Error de validación' });
  }
};
