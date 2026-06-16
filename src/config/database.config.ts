import { DataSourceOptions } from 'typeorm';
import { Property } from '../database/entities/property.entity';
import { Disclosure } from '../database/entities/disclosure.entity';
import { Offer } from '../database/entities/offer.entity';
import { LoanDocument } from '../database/entities/loan-document.entity';

export const databaseConfig = (): DataSourceOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isTesting = process.env.NODE_ENV === 'test';

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'bhumio_db',
    entities: [Property, Disclosure, Offer, LoanDocument],
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
