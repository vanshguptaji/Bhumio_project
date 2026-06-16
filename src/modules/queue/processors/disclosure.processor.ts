import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { AIService } from '../../ai/ai.service';
import { DisclosureService } from '../../disclosure/disclosure.service';

interface ProcessDisclosureJobData {
  disclosureId: string;
  text: string;
}

@Processor('disclosure-processing')
export class DisclosureProcessor {
  private readonly logger = new Logger(DisclosureProcessor.name);

  constructor(
    private aiService: AIService,
    private disclosureService: DisclosureService,
  ) {}

  @Process('analyze-disclosure')
  async analyzeDisclosure(
    job: Job<ProcessDisclosureJobData>,
  ): Promise<{ disclosureId: string; success: boolean }> {
    try {
      this.logger.log(
        `Processing disclosure ${job.data.disclosureId} (Job #${job.id})`,
      );

      const risks = await this.aiService.analyzeRisks(job.data.text);

      await this.disclosureService.updateAnalysis(job.data.disclosureId, {
        summary: risks.summary,
        structuralRisk: risks.structuralRisk,
        legalRisk: risks.legalRisk,
        financialRisk: risks.financialRisk,
        environmentalRisk: risks.environmentalRisk,
        overallRisk: risks.overallRisk,
        extractedData: risks,
      });

      this.logger.log(
        `Successfully processed disclosure ${job.data.disclosureId}`,
      );

      return {
        disclosureId: job.data.disclosureId,
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `Failed to process disclosure ${job.data.disclosureId}: ${error}`,
      );
      throw error;
    }
  }
}
