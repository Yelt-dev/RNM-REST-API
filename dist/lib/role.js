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
exports.checkRole = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = res.locals.jwtPayload;
        try {
            const user = yield connection_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            if (user.length > 0) {
                const { role } = user[0];
                if (roles.includes(role)) {
                    next();
                }
                else {
                    return res.status(401).json({
                        Role: false,
                        message: 'No tienes permiso para acceder a esta sección'
                    });
                }
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: 'El usuario no existe'
                });
            }
        }
        catch (error) {
            return res.status(401).json({
                Role: false,
                message: 'No tienes permiso para acceder a esta sección'
            });
        }
    });
};
exports.checkRole = checkRole;
