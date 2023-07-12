"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    uid: {
        type: String
    },
    email: {
        type: String
    },
    emailVerified: {
        type: Boolean
    },
    displayName: {
        type: String
    },
    isAnonymous: {
        type: Boolean
    },
    photoURL: {
        type: String
    },
    providerData: {
        type: Object
    },
    stsTokenManager: {
        type: Object
    },
    createdAt: {
        type: String
    },
    lastLoginAt: {
        type: String
    },
    apiKey: {
        type: String
    },
    appName: {
        type: String
    },
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('User', userSchema);
