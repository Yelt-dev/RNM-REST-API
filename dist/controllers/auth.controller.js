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
exports.logIn = exports.signUp = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const express_validator_1 = require("express-validator");
const encrypter_1 = require("../lib/encrypter");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../lib/config"));
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!(newUser.username && newUser.password && newUser.role)) {
            return res.status(400).json({
                success: false,
                message: 'Usuario, contraseña y rol son requeridos'
            });
        }
        const username = yield connection_1.default.query('SELECT * FROM users WHERE username = ?', [newUser.username]);
        if (username.length > 0) {
            return res.status(404).json({
                success: false,
                message: 'El nombre de usuario ' + newUser.username + ' está actualmente en uso'
            });
        }
        else {
            newUser.password = yield (0, encrypter_1.encryptPassword)(newUser.password);
            yield connection_1.default.query('INSERT INTO users SET ?', [newUser]);
            return res.status(201).json({
                success: true,
                message: 'Nuevo usuario creado',
            });
        }
    });
}
exports.signUp = signUp;
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!(username && password)) {
            return res.status(400).json({
                success: false,
                message: 'nombre de usuario y contraseña son requeridos'
            });
        }
        const userData = yield connection_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
        if (userData.length > 0) {
            const validPassword = yield (0, encrypter_1.matchPassword)(password, userData[0].password);
            if (validPassword) {
                const token = jsonwebtoken_1.default.sign({ id: userData[0].id, username: userData[0].username }, config_1.default.jwtSecret, { expiresIn: '1h' });
                return res.json({
                    success: true,
                    message: 'Authenticated',
                    token,
                    info: {
                        id: userData[0].id,
                        username: userData[0].username,
                        role: userData[0].role,
                        create_date: userData[0].create_date
                    }
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'El usuario no existe'
            });
        }
    });
}
exports.logIn = logIn;
