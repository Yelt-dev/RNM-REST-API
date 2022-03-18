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
exports.deleteUser = exports.updateUserPassword = exports.getUser = exports.getUsers = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const express_validator_1 = require("express-validator");
const encrypter_1 = require("../lib/encrypter");
function getUsers(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield connection_1.default.query('SELECT * FROM users ORDER BY id ASC');
        if (users.id) {
            return res.status(200).json(users);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'No hay mas usuarios'
            });
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.userId;
        const user = yield connection_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.id) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Este usuario no existe'
            });
        }
    });
}
exports.getUser = getUser;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = res.locals.jwtPayload;
        const { current_password, new_password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!(current_password && new_password)) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña actual y contraseña nueva son requeridos'
            });
        }
        const userData = yield connection_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
        if (userData.id) {
            const validPassword = yield (0, encrypter_1.matchPassword)(current_password, userData.password);
            if (validPassword) {
                let sendPassword = yield (0, encrypter_1.encryptPassword)(new_password);
                yield connection_1.default.query('UPDATE users SET password = ? WHERE id = ?', [sendPassword, id]);
                return res.status(201).json({
                    success: true,
                    message: 'La contraseña ha sido cambiada',
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña actual es incorrecta'
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Este usuario no existe'
            });
        }
    });
}
exports.updateUserPassword = updateUserPassword;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.userId;
        yield connection_1.default.query('DELETE FROM users WHERE id = ?', [id]);
        return res.status(200).json({
            success: true,
            message: 'Usuario eliminado'
        });
    });
}
exports.deleteUser = deleteUser;
