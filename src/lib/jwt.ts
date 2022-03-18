import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "./config";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['authorization'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;

    } catch (error) {
        return res.status(401).json({
            Authorization: false,
            message: '¡Acceso denegado!'
        });
    }

    const {id, username} = jwtPayload;
    const newtoken = jwt.sign({id, username}, config.jwtSecret, {expiresIn: "24h"});

    res.setHeader('token', newtoken);

    next();
}