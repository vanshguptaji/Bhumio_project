"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const property_entity_1 = require("../database/entities/property.entity");
const disclosure_entity_1 = require("../database/entities/disclosure.entity");
const offer_entity_1 = require("../database/entities/offer.entity");
const loan_document_entity_1 = require("../database/entities/loan-document.entity");
const databaseConfig = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const isTesting = process.env.NODE_ENV === 'test';
    return {
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'bhumio_db',
        entities: [property_entity_1.Property, disclosure_entity_1.Disclosure, offer_entity_1.Offer, loan_document_entity_1.LoanDocument],
        synchronize: !isProduction && !isTesting,
        logging: ['error'],
        logger: 'simple-console',
        migrations: ['dist/database/migrations/**/*.js'],
        migrationsRun: true,
        dropSchema: isTesting,
        ssl: isProduction
            ? {
                rejectUnauthorized: false,
            }
            : false,
        extra: {
            max: 20,
            min: 5,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        },
    };
};
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map