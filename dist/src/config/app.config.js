"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const appConfig = () => {
    const nodeEnv = (process.env.NODE_ENV || 'development');
    return {
        nodeEnv,
        port: parseInt(process.env.PORT || '3000'),
        corsOrigin: process.env.CORS_ORIGIN || '*',
        apiPrefix: process.env.API_PREFIX || '/api',
        apiVersion: process.env.API_VERSION || 'v1',
        logLevel: process.env.LOG_LEVEL || 'debug',
        enableSwagger: process.env.ENABLE_SWAGGER !== 'false',
    };
};
exports.appConfig = appConfig;
//# sourceMappingURL=app.config.js.map