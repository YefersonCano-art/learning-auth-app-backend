import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

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

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. Extraer token del header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // "Bearer TOKEN"
  
  // 2. Si no hay token → rechazar
  if (!token) return res.status(401).json({ message: 'No autenticado' });
  
  // 3. Verificar token
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    
    // 4. Guardar datos del usuario en req.user
    req.user = decoded; // { userId, email }
    next(); // Continuar a la ruta
  });
};