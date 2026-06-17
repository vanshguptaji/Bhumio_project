import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database.config';
import {
  PropertyRepository,
  DisclosureRepository,
  OfferRepository,
  LoanDocumentRepository,
} from './repositories';
import {
  Property,
  Disclosure,
  Offer,
  LoanDocument,
} from './entities';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([Property, Disclosure, Offer, LoanDocument]),
  ],
  providers: [
    DatabaseService,
    {
      provide: PropertyRepository,
      inject: [DataSource],
  useFactory: (dataSource: DataSource) => new PropertyRepository(dataSource),
    },
    {
      provide: DisclosureRepository,
      inject: [DataSource],
  useFactory: (dataSource: DataSource) => new DisclosureRepository(dataSource),
    },
    {
      provide: OfferRepository,
      inject: [DataSource],
  useFactory: (dataSource: DataSource) => new OfferRepository(dataSource),
    },
    {
      provide: LoanDocumentRepository,
      inject: [DataSource],
  useFactory: (dataSource: DataSource) => new LoanDocumentRepository(dataSource),
    },
  ],
  exports: [
    DatabaseService,
    PropertyRepository,
    DisclosureRepository,
    OfferRepository,
    LoanDocumentRepository,
  ],
})
export class DatabaseModule {}
