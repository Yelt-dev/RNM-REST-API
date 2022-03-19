import {Request, Response} from 'express';
import connect from '../database/connection';
import { User } from '../interfaces/user.interface';
import { validationResult } from 'express-validator';
import { encryptPassword, matchPassword } from '../lib/encrypter';


export async function getUsers(req: Request, res: Response): Promise<Response>{
    const users: Array<User> = await connect.query('SELECT * FROM users ORDER BY id ASC');
    if(users.length > 0){
        return res.status(200).json(users);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No hay mas usuarios'
        });
    }
}

export async function getUser(req:Request, res: Response): Promise<Response>{
    const id = req.params.userId;
    const user: Array<User> = await connect.query('SELECT * FROM users WHERE id = ?', [id]);
    if(user.length > 0){
        return res.status(200).json(user);
    }else{
        return res.status(404).json({
            success: false,
            message: 'Este usuario no existe'
        });
    }
}

export async function updateUserPassword(req: Request, res: Response){
    const { id } = res.locals.jwtPayload;

    const { current_password, new_password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if(!(current_password && new_password)){
        return res.status(400).json({
            success: false,
            message: 'Contraseña actual y contraseña nueva son requeridos'
        });
    }

    const userData: User = await connect.query('SELECT * FROM users WHERE id = ?', [id]);
    if(userData.id){
        const validPassword = await matchPassword(current_password, userData.password);
        if(validPassword){
            let sendPassword = await encryptPassword(new_password);
            await connect.query('UPDATE users SET password = ? WHERE id = ?', [sendPassword, id]);
            return res.status(201).json({
                success: true,
                message: 'La contraseña ha sido cambiada',
            });
        }else{
            return res.status(400).json({
                success: false,
                message: 'La contraseña actual es incorrecta'
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: 'Este usuario no existe'
        });
    }
}

export async function deleteUser(req:Request, res: Response){
    const id = req.params.userId
    await connect.query('DELETE FROM users WHERE id = ?', [id]);
    return res.status(200).json({
        success: true,
        message: 'Usuario eliminado'
    });
}