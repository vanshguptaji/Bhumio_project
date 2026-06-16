import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Property } from './src/database/entities/property.entity';
import { Disclosure } from './src/database/entities/disclosure.entity';
import { Offer } from './src/database/entities/offer.entity';
import { LoanDocument } from './src/database/entities/loan-document.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'bhumio_db',
  entities: [Property, Disclosure, Offer, LoanDocument],
  migrations: ['src/database/migrations/**/*.ts'],
  migrationsTransactionMode: 'each',
  subscribers: [],
  synchronize: false,
  logging: true,
  logger: 'simple-console',
});
