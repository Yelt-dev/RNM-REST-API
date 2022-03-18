import {Request, Response} from 'express';

export function mainRoute(req:Request, res:Response){
    let today = new Date();
    return res.json({
        Application: 'Rick And Morty Multiverse REST API',
        Status: 'Running',
        Mode: 'Production',
        Auth: true
    });
}