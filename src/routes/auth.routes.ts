import {Router} from 'express';
import { signUp, logIn } from '../controllers/auth.controller';
import validators from '../lib/validator';
import { checkJWT } from "../lib/jwt";
import { checkRole } from "../lib/role";


const router = Router();

router.route('/signup')
    .post([checkJWT, checkRole([1])], validators.signup, signUp);

router.route('/login',)
    .post(validators.login, logIn);

    
export default router;