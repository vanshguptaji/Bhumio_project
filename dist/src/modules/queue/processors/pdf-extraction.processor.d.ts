import type { Job } from 'bull';
import { AIService } from '../../ai/ai.service';
interface ExtractPdfJobData {
    fileUrl: string;
    documentType: 'contract' | 'loan-approval';
    offerId?: string;
}
export declare class PDFExtractionProcessor {
    private aiService;
    private readonly logger;
    constructor(aiService: AIService);
    extractPdf(job: Job<ExtractPdfJobData>): Promise<{
        fileUrl: string;
        extracted: Record<string, any>;
    }>;
    private getSchemaForDocumentType;
}
export {};
