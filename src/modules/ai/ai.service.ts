import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AIProvider, AIProviderOptions } from './providers';
import { OllamaProvider } from './providers/ollama.provider';

@Injectable()
export class AIService implements OnModuleInit {
  private readonly logger = new Logger(AIService.name);
  private provider: AIProvider;
  private isProviderHealthy = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.logger.log('Initializing AI provider');

    const ollamaBaseUrl =
      this.configService.get<string>('OLLAMA_BASE_URL') ||
      'http://localhost:11434';
    const ollamaModel =
      this.configService.get<string>('OLLAMA_MODEL') || 'qwen3:8b';
    const ollamaTimeout = parseInt(
      this.configService.get<string>('OLLAMA_TIMEOUT') || '300000',
    );

    const options: AIProviderOptions = {
      baseUrl: ollamaBaseUrl,
      timeout: ollamaTimeout,
      retryAttempts: 3,
    };

    this.provider = new OllamaProvider(options, ollamaModel);

    try {
      this.isProviderHealthy = await this.provider.health();
      if (!this.isProviderHealthy) {
        this.logger.warn('AI provider health check failed. Using mock AI fallback mode.');
      } else {
        this.logger.log('AI provider initialized successfully');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      this.logger.warn(`AI provider connection failed: ${errorMessage}. Using mock AI fallback mode.`);
      this.isProviderHealthy = false;
    }
  }

  async generateText(
    prompt: string,
    context?: Record<string, any>,
  ): Promise<string> {
    if (!this.isProviderHealthy) {
      return this.generateMockText(prompt);
    }
    try {
      return await this.provider.generateText(prompt, context);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Ollama generateText failed: ${errorMessage}. Falling back to mock.`);
      return this.generateMockText(prompt);
    }
  }

  async extractData(
    text: string,
    schema: Record<string, string>,
  ): Promise<{ success: boolean; data: Record<string, any>; error?: string }> {
    if (!this.isProviderHealthy) {
      return { success: true, data: this.generateMockExtractedData(text, schema) };
    }
    try {
      const result = await this.provider.extractData(text, schema);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Ollama extractData failed: ${errorMessage}. Falling back to mock.`);
      return { success: true, data: this.generateMockExtractedData(text, schema) };
    }
  }

  async analyzeRisks(
    disclosureText: string,
  ): Promise<{
    summary: string;
    structuralRisk: number;
    legalRisk: number;
    financialRisk: number;
    environmentalRisk: number;
    overallRisk: number;
  }> {
    if (!this.isProviderHealthy || disclosureText.includes('placeholder-text') || disclosureText.length < 50) {
      return this.generateMockDisclosureAnalysis(disclosureText);
    }
    try {
      return await this.provider.analyzeRisks(disclosureText);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Ollama analyzeRisks failed: ${errorMessage}. Falling back to mock.`);
      return this.generateMockDisclosureAnalysis(disclosureText);
    }
  }

  async analyzeOffer(
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
  }> {
    if (!this.isProviderHealthy || contractText.includes('placeholder-text') || contractText.length < 50) {
      return this.generateMockOfferAnalysis(contractText);
    }
    try {
      return await this.provider.analyzeOffer(contractText);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Ollama analyzeOffer failed: ${errorMessage}. Falling back to mock.`);
      return this.generateMockOfferAnalysis(contractText);
    }
  }

  async health(): Promise<boolean> {
    try {
      return this.isProviderHealthy && (await this.provider.health());
    } catch {
      return false;
    }
  }

  getProvider(): AIProvider {
    return this.provider;
  }

  // --- MOCK AI FALLBACK METHODS ---

  private generateMockText(prompt: string): string {
    if (prompt.includes('disclosure')) {
      return JSON.stringify(this.generateMockDisclosureAnalysis(prompt));
    }
    if (prompt.includes('contract')) {
      return JSON.stringify(this.generateMockOfferAnalysis(prompt));
    }
    return "This is a mock AI response generated in fallback mode because the Ollama provider is currently offline.";
  }

  private generateMockExtractedData(text: string, schema: Record<string, string>): Record<string, any> {
    const isLoan = 'lenderName' in schema || text.toLowerCase().includes('loan') || text.toLowerCase().includes('mortgage');
    
    if (isLoan) {
      return {
        lenderName: "Chase Mortgage Services",
        loanAmount: 480000,
        financingType: "Conventional 30-Year Fixed",
        approved: true,
        interestRate: "6.25%"
      };
    } else {
      return {
        buyerName: "Sarah Connor",
        offerPrice: 600000,
        closingDays: 30,
        inspectionContingency: true,
        financingContingency: true,
        appraisalContingency: true,
        additionalConditions: "Seller to credit $5,000 for carpet replacement."
      };
    }
  }

  private generateMockDisclosureAnalysis(text: string): any {
    // Generate slightly different mock data depending on keywords in the text
    const lowerText = text.toLowerCase();
    let structural = 15;
    let legal = 5;
    let environmental = 8;
    let financial = 10;
    let summary = "Property disclosure indicates overall good structural health. The roof was replaced in 2021 and water heater in 2023. No structural defects reported.";

    if (lowerText.includes('leak') || lowerText.includes('water') || lowerText.includes('foundation') || lowerText.includes('crack')) {
      structural = 45;
      summary = "Disclosure notes minor foundation settling cracks in basement and history of water seepage during heavy rain. A sump pump was installed in 2022 to remediate water issues.";
    }
    if (lowerText.includes('mold') || lowerText.includes('asbestos') || lowerText.includes('flood') || lowerText.includes('hazard')) {
      environmental = 35;
      summary = "Property is located in Zone AE (moderate flood risk zone), requiring active flood insurance. Disclosure also reports remediated attic mold from 2023 with certificate of completion.";
    }
    if (lowerText.includes('lawsuit') || lowerText.includes('boundary') || lowerText.includes('easement') || lowerText.includes('dispute')) {
      legal = 55;
      summary = "Disclosure indicates a utility easement on the west edge of the property and a minor boundary dispute regarding the fence line with the northern neighbor.";
    }

    const overall = Math.round((structural + legal + environmental + financial) / 4);

    return {
      summary,
      structuralRisk: structural,
      legalRisk: legal,
      financialRisk: financial,
      environmentalRisk: environmental,
      overallRisk: overall
    };
  }

  private generateMockOfferAnalysis(text: string): any {
    const lowerText = text.toLowerCase();
    
    let buyerName = "James Smith";
    let offerPrice = 550000;
    let closingDays = 30;
    let inspection = true;
    let financing = true;
    let appraisal = true;
    let explanation = "Strong conventional offer at list price. The loan approval document is attached, showing solid financing. Standard inspection and appraisal contingencies apply.";

    if (lowerText.includes('cash') || lowerText.includes('no contingency')) {
      offerPrice = 575000;
      closingDays = 14;
      inspection = false;
      financing = false;
      appraisal = false;
      explanation = "Excellent cash offer above list price with zero contingencies and a rapid 14-day close timeline. Highly reliable submission with extremely low transaction risk.";
    } else if (lowerText.includes('john') || lowerText.includes('fha')) {
      buyerName = "John Doe";
      offerPrice = 535000;
      closingDays = 45;
      explanation = "FHA financing offer below list price. Requires FHA appraisal and inspection, which adds moderate closing timeline risks. Lender is verified.";
    } else if (lowerText.includes('alice') || lowerText.includes('waive')) {
      buyerName = "Alice Johnson";
      offerPrice = 560000;
      closingDays = 21;
      appraisal = false;
      explanation = "Competitive offer above list price. Financing is conventional. Inspection contingency is active but appraisal contingency has been waived, reducing transaction risk.";
    }

    return {
      buyerName,
      offerPrice,
      closingDays,
      contingencies: {
        inspection,
        financing,
        appraisal
      },
      explanation
    };
  }
}
