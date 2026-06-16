export interface AIProviderOptions {
    baseUrl: string;
    timeout: number;
    retryAttempts?: number;
}
export interface AIAnalysisResult {
    success: boolean;
    data: Record<string, any>;
    error?: string;
}
export interface AIProvider {
    generateText(prompt: string, context?: Record<string, any>): Promise<string>;
    extractData(text: string, schema: Record<string, string>): Promise<AIAnalysisResult>;
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
