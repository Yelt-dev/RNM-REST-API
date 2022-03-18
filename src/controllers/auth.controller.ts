import {Request, Response} from 'express';
import { User } from "../interfaces/user.interface";
import connect from '../database/connection';
import { validationResult } from 'express-validator';
import { encryptPassword, matchPassword } from '../lib/encrypter';
import jwt from 'jsonwebtoken';
import config from '../lib/config';

export async function signUp(req:Request, res:Response){
    
    const newUser: User = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(!(newUser.username && newUser.password && newUser.role)){
        return res.status(400).json({
            success: false,
            message: 'Usuario, contraseña y rol son requeridos'
        })
    }

    const username = await connect.query('SELECT * FROM users WHERE correo = ?', [newUser.username]);
    if(username.length > 0){
        return res.status(404).json({
            success: false,
            message: 'El nombre de usuario '+newUser.username+' está actualmente en uso'
        });
    }else{
        newUser.password = await encryptPassword(newUser.password);
        await connect.query('INSERT INTO usuarios SET ?', [newUser]);
        
        return res.status(201).json({
            success: true,
            message: 'Nuevo usuario creado',
        });
    }
}

export async function logIn(req: Request, res: Response){

    const {username, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if(!(username && password)){
        return res.status(400).json({
            success: false,
            message: 'nombre de usuario y contraseña son requeridos'
        })
    }

    const userData = await connect.query('SELECT * FROM users WHERE username = ?', [username]);
    if(userData.length > 0){
        const validPassword = await matchPassword(password, userData[0].password);
        if(validPassword){
            const token = jwt.sign({id: userData[0].id, username: userData[0].username }, config.jwtSecret, {expiresIn: '1h'});
            return res.json({
                success: true,
                message: 'Authenticated',
                token,
                info: {
                    id: userData[0].id,
                    username: userData[0].username,
                    role: userData[0].role,
                    create_date: userData[0].create_date
                }
            });
        }else{
            return res.status(400).json({
                success: false,
                message: 'La contraseña es incorrecta'
            });
        }
    }else{
        return res.status(400).json({
            success: false,
            message: 'El usuario no existe'
        });
    }
}

