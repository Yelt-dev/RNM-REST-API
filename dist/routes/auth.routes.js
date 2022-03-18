"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validator_1 = __importDefault(require("../lib/validator"));
const jwt_1 = require("../lib/jwt");
const role_1 = require("../lib/role");
const router = (0, express_1.Router)();
router.route('/signup')
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1])], validator_1.default.signup, auth_controller_1.signUp);
router.route('/login')
    .post(validator_1.default.login, auth_controller_1.logIn);
exports.default = router;
