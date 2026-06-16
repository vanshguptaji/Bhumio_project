import type { Queue } from 'bull';
export declare class QueueService {
    private disclosureQueue;
    private pdfQueue;
    private readonly logger;
    constructor(disclosureQueue: Queue, pdfQueue: Queue);
    addDisclosureAnalysis(disclosureId: string, text: string): Promise<void>;
    addPdfExtraction(fileUrl: string, documentType: 'contract' | 'loan-approval', offerId?: string): Promise<void>;
    getDisclosureQueueStats(): Promise<any>;
    getPdfQueueStats(): Promise<any>;
}
