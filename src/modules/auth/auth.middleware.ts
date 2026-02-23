import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Validación para el login
const loginSchema = z.object({
  email: z.email({ message: "Ingresa un correo válido" }),
  password: z.string({ message: "La contraseña es requerida" }).min(6, "Mínimo 6 caracteres"),
})

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body || {};
    loginSchema.parse(body);
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