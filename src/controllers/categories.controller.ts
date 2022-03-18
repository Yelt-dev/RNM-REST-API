import connect from '../database/connection';
import {Request, Response} from 'express';
import { Category } from '../interfaces/category.interface';

export async function getCategories(req:Request, res: Response): Promise<Response>{
    const categories: Category = await connect.query('SELECT * FROM categories ORDER BY id DESC');
    if(categories){
        return res.status(200).json(categories);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No existe ninguna categoría'
        });
    }
}