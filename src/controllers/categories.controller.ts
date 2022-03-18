import connect from '../database/connection';
import {Request, Response} from 'express';
import { Category } from '../interfaces/category.interface';

export async function getCategories(req: Request, res: Response): Promise<Response>{
    const categories: Array<Category> = await connect.query('SELECT * FROM categories ORDER BY id DESC');
    if(categories.length > 0){
        return res.json(categories);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No existe ninguna categoría'
        });
    }
}

export async function getCategory(req:Request, res: Response): Promise<Response>{
    const id = req.params.categoryId
    const category: Array<Category> = await connect.query('SELECT * FROM categories WHERE id = ?', [id]);
    if(category.length > 0){
        return res.status(200).json(category);
    }else{
        return res.status(404).json({
            success: false,
            message: 'Esta categoría no existe'
        });
    }
}

export async function newCategory(req: Request, res: Response){
    const newCategory: Category = req.body;
    const sendCategory = {
        name: newCategory.name,
        description: newCategory.description
    }

    if(!(sendCategory.name && sendCategory.description)){
        return res.status(400).json({
            success: false,
            message: 'Nombre, descripcion de categoría son requeridos'
        });
    }
    
    await connect.query('INSERT INTO categories SET ?', [sendCategory]);
    return res.status(201).json({
        success: true,
        message: 'Nueva categoría creada'
    });
}

export async function updateCategory(req: Request, res: Response){
    const id = req.params.categoryId;
    const updateCategory: Category = req.body;
    
    await connect.query('UPDATE categories SET ? WHERE id = ?', [updateCategory, id]);
    return res.status(201).json({
        success: true,
        message: 'Categoría actualizada'
    });
}

export async function deleteCategory(req:Request, res: Response){
    const id = req.params.categoryId
    await connect.query('DELETE FROM categories WHERE id = ?', [id]);
    return res.status(200).json({
        success: true,
        message: 'Categoría eliminada'
    });
}

export async function searchCategory(req:Request, res: Response){
    const { field } = req.body;
    const findCategories: Category = await connect.query("SELECT * FROM categories WHERE name LIKE CONCAT('%', ? , '%') ORDER BY id DESC", [field]);
    if(findCategories){
        return res.status(200).json(findCategories);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No se encontraron resultados'
        });
    }
}