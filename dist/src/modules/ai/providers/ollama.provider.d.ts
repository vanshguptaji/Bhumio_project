import type { AIProvider, AIProviderOptions } from './ai.provider';
export declare class OllamaProvider implements AIProvider {
    private readonly options;
    private readonly logger;
    private client;
    private model;
    constructor(options: AIProviderOptions, model?: string);
    generateText(prompt: string, context?: Record<string, any>): Promise<string>;
    extractData(text: string, schema: Record<string, string>): Promise<{
        success: boolean;
        data: Record<string, any>;
        error?: string;
    }>;
    analyzeRisks(disclosureText: string): Promise<{
        summary: string;
        structuralRisk: number;
        legalRisk: number;
        financialRisk: number;
        environmentalRisk: number;
        overallRisk: number;
    }>;
    analyzeOffer(contractText: string): Promise<{
        buyerName?: string;
        offerPrice?: number;
        closingDays?: number;
        contingencies: {
            inspection: boolean;
            financing: boolean;
            appraisal: boolean;
        };
        explanation: string;
    }>;
    health(): Promise<boolean>;
}
