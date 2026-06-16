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
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Property),
    },
    {
      provide: DisclosureRepository,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Disclosure),
    },
    {
      provide: OfferRepository,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Offer),
    },
    {
      provide: LoanDocumentRepository,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(LoanDocument),
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
