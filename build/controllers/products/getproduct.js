"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const product_1 = require("../../models/product");
const logger_1 = require("../../utils/logger");
const errorHandler_1 = require("../../utils/errorHandler");
const getProducts = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.find({});
        if (!product) {
            res.status(400).json({ msg: 'No product found' });
            logger_1.logger.info('No product found');
        }
        res.status(200).json(product);
        logger_1.logger.info('Product found', product);
    }
    catch (error) {
        (0, errorHandler_1.serverError)(error, res);
    }
});
exports.getProducts = getProducts;
