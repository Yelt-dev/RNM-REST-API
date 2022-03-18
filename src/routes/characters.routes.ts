import { Router } from "express";
import { getCharacters, getCharacter, newCharacter, updateChacacter, deleteCharacter, searchCharacter} from '../controllers/characters.controller'
import { checkJWT } from "../lib/jwt";
import { checkRole } from "../lib/role";
import cors from "cors";

const router = Router();

router.route('/')
    .get([checkJWT, checkRole([1,2,3])], cors(),  getCharacters)
    .post([checkJWT, checkRole([1,2])], newCharacter);

router.route('/:characterId')
    .get([checkJWT, checkRole([1, 2])], getCharacter)
    .delete([checkJWT, checkRole([1])], deleteCharacter)
    .put([checkJWT, checkRole([1])], updateChacacter);

router.route('/search')
    .post([checkJWT, checkRole([1, 2, 3])], searchCharacter);


export default router;
