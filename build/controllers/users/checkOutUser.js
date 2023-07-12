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
exports.checkOutUser = void 0;
const errorHandler_1 = require("../../utils/errorHandler");
const logger_1 = require("../../utils/logger");
const token_1 = require("../../middleware/token");
const soldProducts_1 = require("../../models/soldProducts");
const checkOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const { uid } = req.params;
        const { customerName, itemsBought, total, transactions } = req.body;
        const verified = yield (0, token_1.verifyUserToken)(token);
        if (!verified) {
            logger_1.logger.error('User not checked in');
            res.status(401).json({
                message: 'User not checked in'
            });
        }
        const newSoldProduct = yield soldProducts_1.SoldProduct.create({
            uid,
            customerName,
            itemsBought,
            total,
            transactions
        });
        res.status(201).json({
            message: 'User checked out successfully'
        });
        logger_1.logger.info('User checked out successfully', newSoldProduct);
    }
    catch (error) {
        (0, errorHandler_1.serverError)(error, res);
    }
});
exports.checkOutUser = checkOutUser;
