"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const checkJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    let jwtPayload;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        return res.status(401).json({
            Authorization: false,
            message: '¡Acceso denegado!'
        });
    }
    const { id, username } = jwtPayload;
    const newtoken = jsonwebtoken_1.default.sign({ id, username }, config_1.default.jwtSecret, { expiresIn: "24h" });
    res.setHeader('token', newtoken);
    next();
};
exports.checkJWT = checkJWT;
