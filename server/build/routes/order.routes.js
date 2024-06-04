"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const verifyToken_1 = require("../jwt/verifyToken");
const verifyTokenPayment_1 = require("../jwt/verifyTokenPayment");
const router = (0, express_1.Router)();
router.post('/order', verifyToken_1.verifyToken, order_controller_1.createOrder);
router.get('/list_order', verifyToken_1.verifyToken, order_controller_1.getAllOrdersByUser);
router.put('/order/:id', verifyToken_1.verifyToken, order_controller_1.updateOrder);
router.delete('/order/:id', verifyToken_1.verifyToken, order_controller_1.deleteOrderById);
router.get('/all_orders', verifyToken_1.verifyToken, order_controller_1.getAllOrdersByAdmin);
router.post('/verifyToken-payment', verifyTokenPayment_1.verifyTokenPayment, order_controller_1.updatePayment);
exports.default = router;
