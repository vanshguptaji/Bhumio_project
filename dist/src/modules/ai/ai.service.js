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
var AIService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ollama_provider_1 = require("./providers/ollama.provider");
let AIService = AIService_1 = class AIService {
    configService;
    logger = new common_1.Logger(AIService_1.name);
    provider;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        this.logger.log('Initializing AI provider');
        const config = this.configService.get('aiConfig');
        const options = {
            baseUrl: config.ollamaBaseUrl,
            timeout: config.ollamaTimeout,
            retryAttempts: 3,
        };
        this.provider = new ollama_provider_1.OllamaProvider(options, config.ollamaModel);
        const isHealthy = await this.provider.health();
        if (!isHealthy) {
            this.logger.warn('AI provider health check failed');
        }
        else {
            this.logger.log('AI provider initialized successfully');
        }
    }
    async generateText(prompt, context) {
        return this.provider.generateText(prompt, context);
    }
    async extractData(text, schema) {
        return this.provider.extractData(text, schema);
    }
    async analyzeRisks(disclosureText) {
        return this.provider.analyzeRisks(disclosureText);
    }
    async analyzeOffer(contractText) {
        return this.provider.analyzeOffer(contractText);
    }
    async health() {
        return this.provider.health();
    }
    getProvider() {
        return this.provider;
    }
};
exports.AIService = AIService;
exports.AIService = AIService = AIService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AIService);
//# sourceMappingURL=ai.service.js.map