import { Router } from "express";
import { getUsers, getUser, deleteUser, updateUserPassword } from '../controllers/users.controller';
import { checkJWT } from "../lib/jwt";
import { checkRole } from "../lib/role";
import validators from '../lib/validator';


const router = Router();

router.route('/')
    .get([checkJWT, checkRole([1])], getUsers);

router.route('/:userId')
    .get([checkJWT, checkRole([1])], getUser)
    .delete([checkJWT, checkRole([1])], deleteUser);

router.route('/update-password')
    .put(validators.changePassword, [checkJWT, checkRole([1, 2, 3])], updateUserPassword);
    

export default router;
