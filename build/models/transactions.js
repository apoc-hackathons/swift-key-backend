"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    }
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
