import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';
import { DisclosureProcessor, PDFExtractionProcessor } from './processors';
import { AIModule } from '../ai/ai.module';
import { DisclosureModule } from '../disclosure/disclosure.module';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'disclosure-processing',
      },
      {
        name: 'pdf-extraction',
      },
    ),
    AIModule,
    DisclosureModule,
  ],
  providers: [QueueService, DisclosureProcessor, PDFExtractionProcessor],
  exports: [QueueService],
})
export class QueueModule {}
