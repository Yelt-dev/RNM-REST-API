import connect from '../database/connection';
import {Request, Response} from 'express';
import { Character } from '../interfaces/character.interface';

export async function getCharacters(req:Request, res: Response): Promise<Response>{
    const characters: Array<Character> = await connect.query('SELECT * FROM characters ORDER BY id DESC');
    if(characters.length > 0){
        return res.status(200).json(characters);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No existe ningun personaje'
        });
    }
}

export async function getCharacter(req:Request, res: Response): Promise<Response>{
    const id = req.params.characterId
    const character: Array<Character> = await connect.query('SELECT * FROM characters WHERE id = ?', [id]);
    if(character.length > 0){
        return res.status(200).json(character);
    }else{
        return res.status(404).json({
            success: false,
            message: 'Este personaje no existe'
        });
    }
}

export async function newCharacter(req: Request, res: Response){
    const newCharacter: Character = req.body;
    const sendCharacter = {
        name: newCharacter.name,
        description: newCharacter.description,
        location: newCharacter.location
    }

    if(!(sendCharacter.name && sendCharacter.description && sendCharacter.location)){
        return res.status(400).json({
            success: false,
            message: 'Nombre, descripcion y Locación del personaje son requeridos'
        });
    }
    
    await connect.query('INSERT INTO characters SET ?', [sendCharacter]);
    return res.status(201).json({
        success: true,
        message: 'Nuevo personaje creado'
    });
}

export async function updateChacacter(req: Request, res: Response){
    const id = req.params.characterId;
    const updateCharacter: Character = req.body;
    
    await connect.query('UPDATE characters SET ? WHERE id = ?', [updateCharacter, id]);
    return res.status(201).json({
        success: true,
        message: 'Personaje actualizado'
    });
}

export async function deleteCharacter(req:Request, res: Response){
    const id = req.params.characterId
    await connect.query('DELETE FROM characters WHERE id = ?', [id]);
    return res.status(200).json({
        success: true,
        message: 'Personaje eliminado'
    });
}

export async function searchCharacter(req:Request, res: Response){
    const { field } = req.body;
    const findCharacters: Character = await connect.query("SELECT * FROM characters WHERE name LIKE CONCAT('%', ? , '%') ORDER BY id DESC", [field]);
    if(findCharacters){
        return res.status(200).json(findCharacters);
    }else{
        return res.status(404).json({
            success: false,
            message: 'No se encontraron resultados'
        });
    }
}