"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    images: [{ type: String }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
