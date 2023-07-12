"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getproduct_1 = require("../../controllers/products/getproduct");
const productRouter = (0, express_1.Router)();
productRouter.get('/', getproduct_1.getProducts);
exports.default = productRouter;
