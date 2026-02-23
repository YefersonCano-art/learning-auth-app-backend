import { Router } from 'express';
import { getUsers, getUserById, createUser, editUser, deleteUser } from './users.controller';
import { validateUser } from './users.middleware';

const router = Router();

// Rutas de usuarios
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUser, editUser);
router.delete('/:id', deleteUser);

export default router;
