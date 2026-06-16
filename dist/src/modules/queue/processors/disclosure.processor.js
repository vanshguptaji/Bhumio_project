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
var DisclosureProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclosureProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../../ai/ai.service");
const disclosure_service_1 = require("../../disclosure/disclosure.service");
let DisclosureProcessor = DisclosureProcessor_1 = class DisclosureProcessor {
    aiService;
    disclosureService;
    logger = new common_1.Logger(DisclosureProcessor_1.name);
    constructor(aiService, disclosureService) {
        this.aiService = aiService;
        this.disclosureService = disclosureService;
    }
    async analyzeDisclosure(job) {
        try {
            this.logger.log(`Processing disclosure ${job.data.disclosureId} (Job #${job.id})`);
            const risks = await this.aiService.analyzeRisks(job.data.text);
            await this.disclosureService.updateAnalysis(job.data.disclosureId, {
                summary: risks.summary,
                structuralRisk: risks.structuralRisk,
                legalRisk: risks.legalRisk,
                financialRisk: risks.financialRisk,
                environmentalRisk: risks.environmentalRisk,
                overallRisk: risks.overallRisk,
                extractedData: risks,
            });
            this.logger.log(`Successfully processed disclosure ${job.data.disclosureId}`);
            return {
                disclosureId: job.data.disclosureId,
                success: true,
            };
        }
        catch (error) {
            this.logger.error(`Failed to process disclosure ${job.data.disclosureId}: ${error}`);
            throw error;
        }
    }
};
exports.DisclosureProcessor = DisclosureProcessor;
__decorate([
    (0, bull_1.Process)('analyze-disclosure'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DisclosureProcessor.prototype, "analyzeDisclosure", null);
exports.DisclosureProcessor = DisclosureProcessor = DisclosureProcessor_1 = __decorate([
    (0, bull_1.Processor)('disclosure-processing'),
    __metadata("design:paramtypes", [ai_service_1.AIService,
        disclosure_service_1.DisclosureService])
], DisclosureProcessor);
//# sourceMappingURL=disclosure.processor.js.map