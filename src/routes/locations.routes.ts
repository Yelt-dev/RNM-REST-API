import { Router } from "express";
import { getLocations, getLocation, newLocation, updateLocation, deleteLocation, searchLocations} from '../controllers/locations.controller'
import { checkJWT } from "../lib/jwt";
import { checkRole } from "../lib/role";
import cors from "cors";

const router = Router();

router.route('/')
    .get([checkJWT, checkRole([1,2,3])], cors(),  getLocations)
    .post([checkJWT, checkRole([1,2])], newLocation);

router.route('/:locationId')
    .get([checkJWT, checkRole([1, 2])], getLocation)
    .delete([checkJWT, checkRole([1])], deleteLocation)
    .put([checkJWT, checkRole([1])], updateLocation);

router.route('/search')
    .post([checkJWT, checkRole([1, 2, 3])], searchLocations);


export default router;
