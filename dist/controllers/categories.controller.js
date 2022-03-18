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
exports.searchCategory = exports.deleteCategory = exports.updateCategory = exports.newCategory = exports.getCategory = exports.getCategories = void 0;
const connection_1 = __importDefault(require("../database/connection"));
function getCategories(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield connection_1.default.query('SELECT * FROM categories ORDER BY id DESC');
        if (categories.id) {
            return res.status(200).json(categories);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No existe ninguna categoría'
            });
        }
    });
}
exports.getCategories = getCategories;
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const category = yield connection_1.default.query('SELECT * FROM categories WHERE id = ?', [id]);
        if (category.id) {
            return res.status(200).json(category);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Esta categoría no existe'
            });
        }
    });
}
exports.getCategory = getCategory;
function newCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = req.body;
        const sendCategory = {
            nombre: newCategory.name,
            descripcion: newCategory.description
        };
        if (!(sendCategory.nombre && sendCategory.descripcion)) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, descripcion de categoría son requeridos'
            });
        }
        yield connection_1.default.query('INSERT INTO categories SET ?', [sendCategory]);
        return res.status(201).json({
            success: true,
            message: 'Nueva categoría creada'
        });
    });
}
exports.newCategory = newCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const updateCategory = req.body;
        yield connection_1.default.query('UPDATE categories SET ? WHERE id = ?', [updateCategory, id]);
        return res.status(201).json({
            success: true,
            message: 'Categoría actualizada'
        });
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        yield connection_1.default.query('DELETE FROM categories WHERE id = ?', [id]);
        return res.status(200).json({
            success: true,
            message: 'Categoría eliminada'
        });
    });
}
exports.deleteCategory = deleteCategory;
function searchCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field } = req.body;
        const findCategories = yield connection_1.default.query("SELECT * FROM categorias WHERE name LIKE CONCAT('%', ? , '%') ORDER BY id DESC", [field]);
        if (findCategories.id) {
            return res.status(200).json(findCategories);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron resultados'
            });
        }
    });
}
exports.searchCategory = searchCategory;
