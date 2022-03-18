import {Request, Response} from 'express';

export function mainRoute(req:Request, res:Response){
    let today = new Date();
    let date = 'day: '+today.getDate() + ', week: '+today.getDay()+', month: '+ today.getMonth() +', year: ' +today.getFullYear()+', hours: '+today.getHours()+', minutes: '+today.getMinutes()+', seconds: '+today.getSeconds();
    return res.json({
        Application: 'Rick And Morty Multiverse REST API',
        Status: 'Running',
        Mode: 'Production',
        SSL: 'Active',
        Access: date,
        Auth: true
    });
}