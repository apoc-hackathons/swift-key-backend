"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = require("uuid");
const s3Config_1 = require("../utils/s3Config");
const dpStorage = (0, multer_s3_1.default)({
    s3: s3Config_1.s3,
    bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: `${(0, uuid_1.v4)()}-${file.originalname}` });
    },
    key: function (req, file, cb) {
        cb(null, `${(0, uuid_1.v4)()}-${Date.now().toString()}`);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Image uploaded is not of type jpg/jpeg or png'));
    }
};
exports.upload = (0, multer_1.default)({
    storage: dpStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 2000000, files: 3 }
});
