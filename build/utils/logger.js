"use strict";
/**
 * @description - Logger
 * @constructor
 * @param {string} level - For the purpose of Debugging
 * @param {string} format - Format
 * @returns {Promise<void>} - Promise
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const dotenv_1 = require("dotenv");
const winston_1 = require("winston");
(0, dotenv_1.config)({ path: `${__dirname}/../../.env` });
exports.logger = (0, winston_1.createLogger)({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.errors({ stack: true }), winston_1.format.colorize(), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.File({
            filename: `logs/error.log`,
            level: 'error'
        }),
        new winston_1.transports.File({ filename: `logs/system.log` })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple()
    }));
}
