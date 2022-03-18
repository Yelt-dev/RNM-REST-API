"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const jwt_1 = require("../lib/jwt");
const role_1 = require("../lib/role");
const validator_1 = __importDefault(require("../lib/validator"));
const router = (0, express_1.Router)();
router.route('/')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1])], users_controller_1.getUsers);
router.route('/:userId')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1])], users_controller_1.getUser)
    .delete([jwt_1.checkJWT, (0, role_1.checkRole)([1])], users_controller_1.deleteUser);
router.route('/update-password')
    .put(validator_1.default.changePassword, [jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], users_controller_1.updateUserPassword);
exports.default = router;
