"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_BUCKET_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY;
/**
 * @description - S3 Bucket Configuration
 * @constructor
 * @returns {Promise<void>} - Promise
 */
exports.s3 = new s3_1.default({
    region,
    accessKeyId,
    secretAccessKey
});
