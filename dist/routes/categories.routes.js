"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const jwt_1 = require("../lib/jwt");
const role_1 = require("../lib/role");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.route('/')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], (0, cors_1.default)(), categories_controller_1.getCategories)
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2])], categories_controller_1.newCategory);
router.route('/:categoryId')
    .get([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2])], categories_controller_1.getCategory)
    .delete([jwt_1.checkJWT, (0, role_1.checkRole)([1])], categories_controller_1.deleteCategory)
    .put([jwt_1.checkJWT, (0, role_1.checkRole)([1])], categories_controller_1.updateCategory);
router.route('/search')
    .post([jwt_1.checkJWT, (0, role_1.checkRole)([1, 2, 3])], categories_controller_1.searchCategory);
exports.default = router;
