import {Router} from 'express';
import { mainRoute } from '../controllers/index.controller';
const router = Router();


router.route('/')
    .get(mainRoute);


export default router;