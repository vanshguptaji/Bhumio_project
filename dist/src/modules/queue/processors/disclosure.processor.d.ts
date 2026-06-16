import type { Job } from 'bull';
import { AIService } from '../../ai/ai.service';
import { DisclosureService } from '../../disclosure/disclosure.service';
interface ProcessDisclosureJobData {
    disclosureId: string;
    text: string;
}
export declare class DisclosureProcessor {
    private aiService;
    private disclosureService;
    private readonly logger;
    constructor(aiService: AIService, disclosureService: DisclosureService);
    analyzeDisclosure(job: Job<ProcessDisclosureJobData>): Promise<{
        disclosureId: string;
        success: boolean;
    }>;
}
export {};
