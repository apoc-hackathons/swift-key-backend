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
exports.checkInUser = void 0;
const errorHandler_1 = require("../../utils/errorHandler");
const logger_1 = require("../../utils/logger");
const token_1 = require("../../middleware/token");
const checkInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const token = yield (0, token_1.checkInUserToken)(uid);
        logger_1.logger.info(`User ${uid} checked in successfully`);
        res
            .status(200)
            .cookie('checkIn', token, {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000,
            secure: true
        })
            .json({
            message: 'User checked in successfully',
            token
        });
    }
    catch (error) {
        (0, errorHandler_1.serverError)(error, res);
    }
});
exports.checkInUser = checkInUser;
