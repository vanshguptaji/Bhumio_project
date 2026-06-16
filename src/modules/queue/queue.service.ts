import { Injectable, Logger } from '@nestjs/common';
import type { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue('disclosure-processing')
    private disclosureQueue: Queue,
    @InjectQueue('pdf-extraction')
    private pdfQueue: Queue,
  ) {}

  async addDisclosureAnalysis(
    disclosureId: string,
    text: string,
  ): Promise<void> {
    this.logger.log(`Adding disclosure analysis job for ${disclosureId}`);

    await this.disclosureQueue.add(
      'analyze-disclosure',
      {
        disclosureId,
        text,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    this.logger.log(`Disclosure analysis job queued for ${disclosureId}`);
  }

  async addPdfExtraction(
    fileUrl: string,
    documentType: 'contract' | 'loan-approval',
    offerId?: string,
  ): Promise<void> {
    this.logger.log(`Adding PDF extraction job for ${fileUrl}`);

    await this.pdfQueue.add(
      'extract-pdf',
      {
        fileUrl,
        documentType,
        offerId,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    this.logger.log(`PDF extraction job queued for ${fileUrl}`);
  }

  async getDisclosureQueueStats(): Promise<any> {
    return {
      active: await this.disclosureQueue.getActiveCount(),
      completed: await this.disclosureQueue.getCompletedCount(),
      failed: await this.disclosureQueue.getFailedCount(),
      delayed: await this.disclosureQueue.getDelayedCount(),
    };
  }

  async getPdfQueueStats(): Promise<any> {
    return {
      active: await this.pdfQueue.getActiveCount(),
      completed: await this.pdfQueue.getCompletedCount(),
      failed: await this.pdfQueue.getFailedCount(),
      delayed: await this.pdfQueue.getDelayedCount(),
    };
  }
}
