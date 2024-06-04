"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const favorites_controller_1 = require("../controllers/favorites.controller");
const express_1 = require("express");
const verifyToken_1 = require("../jwt/verifyToken");
const router = (0, express_1.Router)();
router.post('/favorite/:ProductId', verifyToken_1.verifyToken, favorites_controller_1.addNewFavorite);
router.get('/favorite', verifyToken_1.verifyToken, favorites_controller_1.getFavoritesByUser);
router.delete('/favorite/:ProductId', verifyToken_1.verifyToken, favorites_controller_1.removeFromFavorite);
router.post('/check-favorite/:ProductId', verifyToken_1.verifyToken, favorites_controller_1.checkFavorite);
exports.default = router;
