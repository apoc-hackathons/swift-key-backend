"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
const logger_1 = require("./logger");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `${__dirname}/../../.env` });
const serverError = (err, res) => {
    if (process.env.NODE_ENV === 'production') {
        logger_1.logger.error({
            message: err.stack
        });
        res.status(500).send('Internal Server Error');
    }
    else {
        logger_1.logger.error({
            message: err.stack
        });
        res.status(500).send(err.stack);
    }
};
exports.serverError = serverError;
