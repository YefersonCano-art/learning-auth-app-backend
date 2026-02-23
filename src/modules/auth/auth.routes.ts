import { Router } from 'express';
import { login } from './auth.controller';
import { validateLogin } from './auth.middleware';


const router = Router();

// Rutas de usuarios
router.post('/login', validateLogin, login);


export default router;
