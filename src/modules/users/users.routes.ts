import { Router } from 'express';
import { getUsers, getUserById, createUser, editUser, deleteUser } from './users.controller';
import { validateUser } from './users.middleware';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

// Rutas de usuarios
router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', authenticateToken, validateUser, editUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
