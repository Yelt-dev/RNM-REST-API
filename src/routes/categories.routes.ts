import { Router } from "express";
import { getCategories } from '../controllers/categories.controller';


const router = Router();

router.route('/')
    .get(getCategories);

export default router;
