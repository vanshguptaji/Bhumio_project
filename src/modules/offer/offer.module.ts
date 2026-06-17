import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AIModule } from '../ai/ai.module';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';

@Module({
  imports: [DatabaseModule, AIModule],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
