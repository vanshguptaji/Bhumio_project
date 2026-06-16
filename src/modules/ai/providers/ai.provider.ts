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
  /**
   * Generate text-based AI analysis from prompt
   */
  generateText(prompt: string, context?: Record<string, any>): Promise<string>;

  /**
   * Extract structured data from document text using AI
   */
  extractData(
    text: string,
    schema: Record<string, string>,
  ): Promise<AIAnalysisResult>;

  /**
   * Generate risk assessment summary
   */
  analyzeRisks(
    disclosureText: string,
  ): Promise<{
    summary: string;
    structuralRisk: number;
    legalRisk: number;
    financialRisk: number;
    environmentalRisk: number;
    overallRisk: number;
  }>;

  /**
   * Generate offer analysis
   */
  analyzeOffer(
    contractText: string,
  ): Promise<{
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

  /**
   * Check if provider is healthy
   */
  health(): Promise<boolean>;
}
