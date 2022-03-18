import { check } from 'express-validator';

export default {
    signup:[
        check('password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres')
    ],
    login: [
        check('password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres')
    ],
    changePassword: [
        check('current_password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres'),
        check('new_password').isLength({ min: 6 }).withMessage('La contraseña requiere minimo 6 caracteres')
    ]
}
    
