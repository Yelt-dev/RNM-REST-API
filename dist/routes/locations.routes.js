"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_controller_1 = require("../controllers/locations.controller");
const jwt_1 = require("../lib/jwt");
const role_1 = require("../lib/role");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.route('/')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], (0, cors_1.default)(), locations_controller_1.getLocations)
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2])], locations_controller_1.newLocation);
router.route('/:locationId')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2])], locations_controller_1.getLocation)
    .delete([jwt_1.checkJWT, (0, role_1.checkRole)([1])], locations_controller_1.deleteLocation)
    .put([jwt_1.checkJWT, (0, role_1.checkRole)([1])], locations_controller_1.updateLocation);
router.route('/search')
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], locations_controller_1.searchLocations);
exports.default = router;
