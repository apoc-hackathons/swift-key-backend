"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfigUSER = void 0;
/**
 * @description Cors config for user
 * @constructor
 * @param {CorsOptions} allowedHeaders - Allowed headers
 * @param {CorsOptions} origin - Origin
 * @param {CorsOptions} methods - Methods
 * @param {CorsOptions} credentials - Credentials
 * @returns {CorsOptions} Cors config
 */
exports.corsConfigUSER = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    origin: `${process.env.USER_URL}`,
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true
};
