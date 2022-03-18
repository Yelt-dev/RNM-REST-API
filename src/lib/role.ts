import {Request, Response, NextFunction} from 'express';
import connect from '../database/connection';

export const checkRole = (roles:Array<number>) => {

    return async (req:Request, res:Response, next:NextFunction) => {
        const { id } = res.locals.jwtPayload;
        try {
            const user = await connect.query('SELECT * FROM users WHERE id = ?', [id]);
            if(user.length > 0){
                const { role } = user[0];
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