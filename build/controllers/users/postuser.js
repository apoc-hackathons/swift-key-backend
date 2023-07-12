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
exports.postUser = void 0;
const users_1 = require("../../models/users");
const errorHandler_1 = require("../../utils/errorHandler");
const logger_1 = require("../../utils/logger");
const token_1 = require("../../middleware/token");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, email, emailVerified, displayName, isAnonymous, photoURL, providerData, stsTokenManager, createdAt, lastLoginAt, apiKey, appName } = req.body;
        const user = yield users_1.User.findOne({ uid: uid });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            logger_1.logger.info('User already exists');
        }
        const newUser = new users_1.User({
            uid,
            email,
            emailVerified,
            displayName,
            isAnonymous,
            photoURL,
            providerData,
            stsTokenManager,
            createdAt,
            lastLoginAt,
            apiKey,
            appName
        });
        const token = yield (0, token_1.generateUserToken)(newUser);
        yield newUser.save().then((user) => {
            res
                .status(200)
                .cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
                .send({ msg: 'User saved successfully', data: user });
            logger_1.logger.info('User saved successfully', user);
        });
    }
    catch (error) {
        (0, errorHandler_1.serverError)(error, res);
    }
});
exports.postUser = postUser;
