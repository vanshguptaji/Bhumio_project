import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AIProvider, AIProviderOptions } from './providers';
import { OllamaProvider } from './providers/ollama.provider';

@Injectable()
export class AIService implements OnModuleInit {
  private readonly logger = new Logger(AIService.name);
  private provider: AIProvider;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.logger.log('Initializing AI provider');

    const config = this.configService.get('aiConfig');

    const options: AIProviderOptions = {
      baseUrl: config.ollamaBaseUrl,
      timeout: config.ollamaTimeout,
      retryAttempts: 3,
    };

    this.provider = new OllamaProvider(options, config.ollamaModel);

    const isHealthy = await this.provider.health();
    if (!isHealthy) {
      this.logger.warn('AI provider health check failed');
    } else {
      this.logger.log('AI provider initialized successfully');
    }
  }

  async generateText(
    prompt: string,
    context?: Record<string, any>,
  ): Promise<string> {
    return this.provider.generateText(prompt, context);
  }

  async extractData(
    text: string,
    schema: Record<string, string>,
  ): Promise<{ success: boolean; data: Record<string, any>; error?: string }> {
    return this.provider.extractData(text, schema);
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
    return this.provider.analyzeRisks(disclosureText);
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
    return this.provider.analyzeOffer(contractText);
  }

  async health(): Promise<boolean> {
    return this.provider.health();
  }

  getProvider(): AIProvider {
    return this.provider;
  }
}
