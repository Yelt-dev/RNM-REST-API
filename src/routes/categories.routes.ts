import { Router } from "express";
import { getCategories, getCategory, newCategory, updateCategory, deleteCategory, searchCategory} from '../controllers/categories.controller'
import { checkJWT } from "../lib/jwt";
import { checkRole } from "../lib/role";
import cors from "cors";

const router = Router();

router.route('/')
    .get([checkJWT, checkRole([1,2,3])], cors(),  getCategories)
    .post([checkJWT, checkRole([1,2])], newCategory);

router.route('/:categoryId')
    .get([checkJWT, checkRole([1, 2])], getCategory)
    .delete([checkJWT, checkRole([1])], deleteCategory)
    .put([checkJWT, checkRole([1])], updateCategory);

router.route('/search')
    .post([checkJWT, checkRole([1, 2, 3])], searchCategory);


export default router;
