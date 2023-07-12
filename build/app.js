"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet = __importStar(require("helmet"));
const dbConfig_1 = require("./utils/dbConfig");
const logger_1 = require("./utils/logger");
// import { redisClient } from './utils/redisConfig';
const reviews_1 = __importDefault(require("./routes/reviews"));
const users_1 = __importDefault(require("./routes/users"));
exports.app = (0, express_1.default)();
(0, dbConfig_1.connectToDatabase)()
    .then(() => logger_1.logger.info({ message: 'Database Connected' }))
    .catch((error) => logger_1.logger.error({ message: error.message }));
// redisClient
//   .connect()
//   .then(() => logger.info({ message: 'Redis Connected' }))
//   .catch((error) => logger.error({ message: error.message }));
exports.app.use((0, express_1.urlencoded)({ extended: true }));
exports.app.use((0, express_1.json)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        upgradeInsecureRequests: []
    }
}));
exports.app.use(helmet.crossOriginEmbedderPolicy());
exports.app.use(helmet.crossOriginOpenerPolicy());
exports.app.use(helmet.crossOriginResourcePolicy({ policy: 'same-site' }));
exports.app.use(helmet.frameguard({
    action: 'deny'
}));
exports.app.use(helmet.hidePoweredBy());
exports.app.use(helmet.hsts({
    maxAge: 63072000,
    preload: true
}));
exports.app.use(helmet.ieNoOpen());
exports.app.use(helmet.noSniff());
exports.app.use(helmet.originAgentCluster());
exports.app.use(helmet.permittedCrossDomainPolicies({
    permittedPolicies: 'none'
}));
exports.app.use(helmet.referrerPolicy({
    policy: 'no-referrer'
}));
exports.app.use(helmet.xssFilter());
exports.app.use('/api/v1/reviews', reviews_1.default);
exports.app.use('/api/v1/users', users_1.default);
exports.app.use('/api/v1/products', reviews_1.default);
exports.app.get('/', (req, res) => {
    res.send('Hello world!');
});
