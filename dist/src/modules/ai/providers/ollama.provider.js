"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var OllamaProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let OllamaProvider = OllamaProvider_1 = class OllamaProvider {
    options;
    logger = new common_1.Logger(OllamaProvider_1.name);
    client;
    model;
    constructor(options, model = 'qwen3:8b') {
        this.options = options;
        this.model = model;
        this.client = axios_1.default.create({
            baseURL: options.baseUrl,
            timeout: options.timeout,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async generateText(prompt, context) {
        try {
            this.logger.debug(`Generating text with prompt: ${prompt.substring(0, 100)}...`);
            const systemPrompt = context?.system || 'You are a helpful assistant.';
            const fullPrompt = context?.prefix
                ? `${context.prefix}\n\n${prompt}`
                : prompt;
            const response = await this.client.post('/api/generate', {
                model: this.model,
                prompt: fullPrompt,
                system: systemPrompt,
                stream: false,
                temperature: context?.temperature || 0.7,
            });
            const text = response.data.response.trim();
            this.logger.debug(`Generated text: ${text.substring(0, 100)}...`);
            return text;
        }
        catch (error) {
            this.logger.error(`Failed to generate text: ${error}`);
            throw new Error(`Ollama text generation failed: ${error}`);
        }
    }
    async extractData(text, schema) {
        try {
            this.logger.debug(`Extracting data from text (${text.length} chars)`);
            const prompt = `
Extract the following information from the provided text. Return only valid JSON.

Schema to extract:
${Object.entries(schema)
                .map(([key, desc]) => `- ${key}: ${desc}`)
                .join('\n')}

Text to extract from:
${text}

Return ONLY valid JSON object with the schema keys. No markdown, no code blocks.`;
            const result = await this.generateText(prompt, {
                temperature: 0.1,
            });
            const jsonMatch = result.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in response');
            }
            const data = JSON.parse(jsonMatch[0]);
            this.logger.debug(`Extracted data: ${JSON.stringify(data)}`);
            return { success: true, data };
        }
        catch (error) {
            this.logger.error(`Failed to extract data: ${error}`);
            return {
                success: false,
                data: {},
                error: `Data extraction failed: ${error}`,
            };
        }
    }
    async analyzeRisks(disclosureText) {
        try {
            this.logger.debug('Analyzing risks in disclosure');
            const prompt = `
You are a real estate expert. Analyze the following property disclosure document and provide:
1. A concise summary (2-3 sentences)
2. Risk scores (0-100) for: structural, legal, financial, environmental
3. Overall risk score (0-100)

Return ONLY valid JSON with this structure:
{
  "summary": "...",
  "structuralRisk": 0-100,
  "legalRisk": 0-100,
  "financialRisk": 0-100,
  "environmentalRisk": 0-100,
  "overallRisk": 0-100
}

Disclosure:
${disclosureText}`;
            const result = await this.generateText(prompt, {
                temperature: 0.1,
            });
            const jsonMatch = result.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in response');
            }
            const analysis = JSON.parse(jsonMatch[0]);
            return {
                summary: analysis.summary || '',
                structuralRisk: Math.min(100, Math.max(0, analysis.structuralRisk || 0)),
                legalRisk: Math.min(100, Math.max(0, analysis.legalRisk || 0)),
                financialRisk: Math.min(100, Math.max(0, analysis.financialRisk || 0)),
                environmentalRisk: Math.min(100, Math.max(0, analysis.environmentalRisk || 0)),
                overallRisk: Math.min(100, Math.max(0, analysis.overallRisk || 0)),
            };
        }
        catch (error) {
            this.logger.error(`Failed to analyze risks: ${error}`);
            throw error;
        }
    }
    async analyzeOffer(contractText) {
        try {
            this.logger.debug('Analyzing offer contract');
            const prompt = `
You are a real estate lawyer. Analyze the following purchase contract and extract:
1. Buyer name
2. Offer price (numeric only)
3. Closing timeline in days
4. Presence of inspection, financing, and appraisal contingencies
5. Brief explanation of the offer terms

Return ONLY valid JSON:
{
  "buyerName": "...",
  "offerPrice": number,
  "closingDays": number,
  "contingencies": {
    "inspection": true/false,
    "financing": true/false,
    "appraisal": true/false
  },
  "explanation": "..."
}

Contract:
${contractText}`;
            const result = await this.generateText(prompt, {
                temperature: 0.1,
            });
            const jsonMatch = result.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in response');
            }
            const analysis = JSON.parse(jsonMatch[0]);
            return {
                buyerName: analysis.buyerName,
                offerPrice: analysis.offerPrice,
                closingDays: analysis.closingDays,
                contingencies: analysis.contingencies || {
                    inspection: false,
                    financing: false,
                    appraisal: false,
                },
                explanation: analysis.explanation || '',
            };
        }
        catch (error) {
            this.logger.error(`Failed to analyze offer: ${error}`);
            throw error;
        }
    }
    async health() {
        try {
            this.logger.debug('Checking Ollama health');
            const response = await this.client.get('/api/tags');
            const isHealthy = response.status === 200;
            if (isHealthy) {
                this.logger.log('Ollama provider is healthy');
            }
            return isHealthy;
        }
        catch (error) {
            this.logger.error(`Ollama health check failed: ${error}`);
            return false;
        }
    }
};
exports.OllamaProvider = OllamaProvider;
exports.OllamaProvider = OllamaProvider = OllamaProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, String])
], OllamaProvider);
//# sourceMappingURL=ollama.provider.js.map