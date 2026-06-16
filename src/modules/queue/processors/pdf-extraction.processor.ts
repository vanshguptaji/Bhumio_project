import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { AIService } from '../../ai/ai.service';

interface ExtractPdfJobData {
  fileUrl: string;
  documentType: 'contract' | 'loan-approval';
  offerId?: string;
}

@Processor('pdf-extraction')
export class PDFExtractionProcessor {
  private readonly logger = new Logger(PDFExtractionProcessor.name);

  constructor(private aiService: AIService) {}

  @Process('extract-pdf')
  async extractPdf(
    job: Job<ExtractPdfJobData>,
  ): Promise<{ fileUrl: string; extracted: Record<string, any> }> {
    try {
      this.logger.log(
        `Extracting PDF from ${job.data.fileUrl} (Job #${job.id})`,
      );

      // TODO: Implement PDF extraction from S3/storage
      // For now, this is a placeholder that would:
      // 1. Fetch PDF from storage
      // 2. Extract text using pdf-parse
      // 3. Call AI service to extract structured data

      const extracted = await this.aiService.extractData(
        'placeholder-text',
        this.getSchemaForDocumentType(job.data.documentType),
      );

      if (!extracted.success) {
        throw new Error(`PDF extraction failed: ${extracted.error}`);
      }

      this.logger.log(`Successfully extracted PDF from ${job.data.fileUrl}`);

      return {
        fileUrl: job.data.fileUrl,
        extracted: extracted.data,
      };
    } catch (error) {
      this.logger.error(`Failed to extract PDF ${job.data.fileUrl}: ${error}`);
      throw error;
    }
  }

  private getSchemaForDocumentType(
    type: 'contract' | 'loan-approval',
  ): Record<string, string> {
    if (type === 'contract') {
      return {
        buyerName: 'Full name of the buyer',
        offerPrice: 'Numeric offer price in dollars',
        closingDays: 'Number of days to closing',
        inspectionContingency: 'Whether inspection contingency is present',
        financingContingency: 'Whether financing contingency is present',
        appraisalContingency: 'Whether appraisal contingency is present',
        additionalConditions: 'Any additional conditions or notes',
      };
    } else {
      return {
        lenderName: 'Name of the lending institution',
        loanAmount: 'Loan amount in dollars',
        financingType: 'Type of financing (FHA, Conventional, VA, etc)',
        approved: 'Whether loan is approved',
        interestRate: 'Loan interest rate',
      };
    }
  }
}
