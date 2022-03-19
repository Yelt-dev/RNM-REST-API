import connect from '../database/connection';
import {Request, Response} from 'express';
import { Location } from '../interfaces/location.interface';

export async function getLocations(req: Request, res: Response): Promise<Response>{
    const locations: Array<Location> = await connect.query('SELECT * FROM locations ORDER BY id DESC');
    if(locations.length > 0){
        return res.status(200).json(locations);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No existe ninguna locación'
        });
    }
}

export async function getLocation(req:Request, res: Response): Promise<Response>{
    const id = req.params.locationId
    const location: Array<Location> = await connect.query('SELECT * FROM locations WHERE id = ?', [id]);
    if(location){
        return res.status(200).json(location);
    }else{
        return res.status(404).json({
            success: false,
            message: 'Esta locación no existe'
        });
    }
}

export async function newLocation(req: Request, res: Response){
    const newLocation: Location = req.body;
    const sendLocation = {
        name: newLocation.name,
        description: newLocation.description,
        category: newLocation.category
    }

    if(!(sendLocation.name && sendLocation.description && sendLocation.category)){
        return res.status(400).json({
            success: false,
            message: 'Nombre, descripcion y categoría de locación son requeridos'
        });
    }
    
    await connect.query('INSERT INTO locations SET ?', [sendLocation]);
    return res.status(201).json({
        success: true,
        message: 'Nueva locación creada'
    });
}

export async function updateLocation(req: Request, res: Response){
    const id = req.params.locationId;
    const updateLocation: Location = req.body;
    
    await connect.query('UPDATE locations SET ? WHERE id = ?', [updateLocation, id]);
    return res.status(201).json({
        success: true,
        message: 'Locación actualizada'
    });
}

export async function deleteLocation(req:Request, res: Response){
    const id = req.params.locationId
    await connect.query('DELETE FROM locations WHERE id = ?', [id]);
    return res.status(200).json({
        success: true,
        message: 'Locación eliminada'
    });
}

export async function searchLocations(req:Request, res: Response){
    const { field } = req.body;
    const findLocations: Location = await connect.query("SELECT * FROM locations WHERE name LIKE CONCAT('%', ? , '%') ORDER BY id DESC", [field]);
    if(findLocations){
        return res.status(200).json(findLocations);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No se encontraron resultados'
        });
    }
}