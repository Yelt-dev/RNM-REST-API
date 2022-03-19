"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCharacter = exports.deleteCharacter = exports.updateChacacter = exports.newCharacter = exports.getCharacter = exports.getCharacters = void 0;
const connection_1 = __importDefault(require("../database/connection"));
function getCharacters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const characters = yield connection_1.default.query('SELECT * FROM characters ORDER BY id DESC');
        if (characters.length > 0) {
            return res.status(200).json(characters);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No existe ningun personaje'
            });
        }
    });
}
exports.getCharacters = getCharacters;
function getCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.characterId;
        const character = yield connection_1.default.query('SELECT * FROM characters WHERE id = ?', [id]);
        if (character.length > 0) {
            return res.status(200).json(character);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Este personaje no existe'
            });
        }
    });
}
exports.getCharacter = getCharacter;
function newCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCharacter = req.body;
        const sendCharacter = {
            name: newCharacter.name,
            description: newCharacter.description,
            location: newCharacter.location
        };
        if (!(sendCharacter.name && sendCharacter.description && sendCharacter.location)) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, descripcion y Locación del personaje son requeridos'
            });
        }
        yield connection_1.default.query('INSERT INTO characters SET ?', [sendCharacter]);
        return res.status(201).json({
            success: true,
            message: 'Nuevo personaje creado'
        });
    });
}
exports.newCharacter = newCharacter;
function updateChacacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.characterId;
        const updateCharacter = req.body;
        yield connection_1.default.query('UPDATE characters SET ? WHERE id = ?', [updateCharacter, id]);
        return res.status(201).json({
            success: true,
            message: 'Personaje actualizado'
        });
    });
}
exports.updateChacacter = updateChacacter;
function deleteCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.characterId;
        yield connection_1.default.query('DELETE FROM characters WHERE id = ?', [id]);
        return res.status(200).json({
            success: true,
            message: 'Personaje eliminado'
        });
    });
}
exports.deleteCharacter = deleteCharacter;
function searchCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field } = req.body;
        const findCharacters = yield connection_1.default.query("SELECT * FROM characters WHERE name LIKE CONCAT('%', ? , '%') ORDER BY id DESC", [field]);
        if (findCharacters) {
            return res.status(200).json(findCharacters);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron resultados'
            });
        }
    });
}
exports.searchCharacter = searchCharacter;
