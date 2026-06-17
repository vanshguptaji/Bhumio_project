import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AIProvider } from './providers';
export declare class AIService implements OnModuleInit {
    private configService;
    private readonly logger;
    private provider;
    private isProviderHealthy;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
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
    getProvider(): AIProvider;
    private generateMockText;
    private generateMockExtractedData;
    private generateMockDisclosureAnalysis;
    private generateMockOfferAnalysis;
}
