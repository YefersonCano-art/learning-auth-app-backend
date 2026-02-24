import { Request, Response } from 'express';
import { User } from '../users/users.model';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json({data: users,});
}

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    res.json(user);
}

const createUser = async (req: Request, res: Response) => {   

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    const user =  await User.create(req.body);
    res.status(201).json({message: 'Usuario creado', user});
};

const editUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));
    if (!user) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }
    await user.update(req.body);
    res.json({message: 'Usuario actualizado', user});
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));
    if (!user) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }
    await user.destroy();
    res.json({message: 'Usuario eliminado'});
}

export { getUsers, getUserById, createUser, editUser, deleteUser };