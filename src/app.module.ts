import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AIModule } from './modules/ai/ai.module';
import { DisclosureModule } from './modules/disclosure/disclosure.module';
import { PropertyModule } from './modules/property/property.module';
import { OfferModule } from './modules/offer/offer.module';
import { QueueModule } from './modules/queue/queue.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AIModule,
    DisclosureModule,
    PropertyModule,
    OfferModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
