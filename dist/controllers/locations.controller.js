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
exports.searchLocations = exports.deleteLocation = exports.updateLocation = exports.newLocation = exports.getLocation = exports.getLocations = void 0;
const connection_1 = __importDefault(require("../database/connection"));
function getLocations(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const locations = yield connection_1.default.query('SELECT * FROM locations ORDER BY id DESC');
        if (locations.id) {
            return res.status(200).json(locations);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No existe ninguna locación'
            });
        }
    });
}
exports.getLocations = getLocations;
function getLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.locationId;
        const character = yield connection_1.default.query('SELECT * FROM locations WHERE id = ?', [id]);
        if (character.id) {
            return res.status(200).json(character);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Esta locación no existe'
            });
        }
    });
}
exports.getLocation = getLocation;
function newLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newLocation = req.body;
        const sendLocation = {
            name: newLocation.name,
            description: newLocation.description,
            category: newLocation.category
        };
        if (!(sendLocation.name && sendLocation.description && sendLocation.category)) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, descripcion y categoría de locación son requeridos'
            });
        }
        yield connection_1.default.query('INSERT INTO locations SET ?', [sendLocation]);
        return res.status(201).json({
            success: true,
            message: 'Nueva locación creada'
        });
    });
}
exports.newLocation = newLocation;
function updateLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.locationId;
        const updateLocation = req.body;
        yield connection_1.default.query('UPDATE locations SET ? WHERE id = ?', [updateLocation, id]);
        return res.status(201).json({
            success: true,
            message: 'Locación actualizada'
        });
    });
}
exports.updateLocation = updateLocation;
function deleteLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.locationId;
        yield connection_1.default.query('DELETE FROM locations WHERE id = ?', [id]);
        return res.status(200).json({
            success: true,
            message: 'Locación eliminada'
        });
    });
}
exports.deleteLocation = deleteLocation;
function searchLocations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field } = req.body;
        const findLocations = yield connection_1.default.query("SELECT * FROM locations WHERE name LIKE CONCAT('%', ? , '%') ORDER BY id DESC", [field]);
        if (findLocations.id) {
            return res.status(200).json(findLocations);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron resultados'
            });
        }
    });
}
exports.searchLocations = searchLocations;
