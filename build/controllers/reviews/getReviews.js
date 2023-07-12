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
exports.getReviews = void 0;
const reviews_1 = require("../../models/reviews");
const errorHandler_1 = require("../../utils/errorHandler");
const token_1 = require("../../middleware/token");
const logger_1 = require("../../utils/logger");
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            res.status(401).json({ msg: 'Unauthorized, please login' });
            logger_1.logger.info('Unauthorized');
        }
        const verifiedToken = yield (0, token_1.verifyUserToken)(authToken === null || authToken === void 0 ? void 0 : authToken.split(' ')[1]);
        if (!verifiedToken) {
            res.status(401).json({ msg: 'Unauthorized, please login' });
            logger_1.logger.info('Unauthorized');
        }
        const reviews = yield reviews_1.Review.find().populate('User');
        res.status(200).json(reviews);
        logger_1.logger.info('reviews fetched successfully: ', reviews);
    }
    catch (error) {
        (0, errorHandler_1.serverError)(error, res);
    }
});
exports.getReviews = getReviews;
