"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_controller_1 = require("../controllers/characters.controller");
const jwt_1 = require("../lib/jwt");
const role_1 = require("../lib/role");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.route('/')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], (0, cors_1.default)(), characters_controller_1.getCharacters)
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2])], characters_controller_1.newCharacter);
router.route('/:characterId')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2])], characters_controller_1.getCharacter)
    .delete([jwt_1.checkJWT, (0, role_1.checkRole)([1])], characters_controller_1.deleteCharacter)
    .put([jwt_1.checkJWT, (0, role_1.checkRole)([1])], characters_controller_1.updateChacacter);
router.route('/search')
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], characters_controller_1.searchCharacter);
exports.default = router;
