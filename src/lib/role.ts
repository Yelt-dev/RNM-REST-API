import {Request, Response, NextFunction} from 'express';
import connect from '../database/connection';
import { User } from '../interfaces/user.interface';

export const checkRole = (roles:Array<number>) => {

    return async (res:Response, next:NextFunction) => {
        const { id } = res.locals.jwtPayload;
        try {
            const user: User = await connect.query('SELECT * FROM users WHERE id = ?', [id]);
            if(user.id){
                const { role } = user;
                if(roles.includes(role)){
                    next();
                }else{
                    return res.status(401).json({
                        Role: false,
                        message: 'No tienes permiso para acceder a esta sección'
                    });
                }
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'El usuario no existe'
                });
            }
        } catch (error) {
            return res.status(401).json({
                Role: false,
                message: 'No tienes permiso para acceder a esta sección'
            });
        }
    }
}