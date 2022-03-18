"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    signup: [
        (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres')
    ],
    login: [
        (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres')
    ],
    changePassword: [
        (0, express_validator_1.check)('current_password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres'),
        (0, express_validator_1.check)('new_password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres')
    ]
};
