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
var PDFExtractionProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFExtractionProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../../ai/ai.service");
let PDFExtractionProcessor = PDFExtractionProcessor_1 = class PDFExtractionProcessor {
    aiService;
    logger = new common_1.Logger(PDFExtractionProcessor_1.name);
    constructor(aiService) {
        this.aiService = aiService;
    }
    async extractPdf(job) {
        try {
            this.logger.log(`Extracting PDF from ${job.data.fileUrl} (Job #${job.id})`);
            const extracted = await this.aiService.extractData('placeholder-text', this.getSchemaForDocumentType(job.data.documentType));
            if (!extracted.success) {
                throw new Error(`PDF extraction failed: ${extracted.error}`);
            }
            this.logger.log(`Successfully extracted PDF from ${job.data.fileUrl}`);
            return {
                fileUrl: job.data.fileUrl,
                extracted: extracted.data,
            };
        }
        catch (error) {
            this.logger.error(`Failed to extract PDF ${job.data.fileUrl}: ${error}`);
            throw error;
        }
    }
    getSchemaForDocumentType(type) {
        if (type === 'contract') {
            return {
                buyerName: 'Full name of the buyer',
                offerPrice: 'Numeric offer price in dollars',
                closingDays: 'Number of days to closing',
                inspectionContingency: 'Whether inspection contingency is present',
                financingContingency: 'Whether financing contingency is present',
                appraisalContingency: 'Whether appraisal contingency is present',
                additionalConditions: 'Any additional conditions or notes',
            };
        }
        else {
            return {
                lenderName: 'Name of the lending institution',
                loanAmount: 'Loan amount in dollars',
                financingType: 'Type of financing (FHA, Conventional, VA, etc)',
                approved: 'Whether loan is approved',
                interestRate: 'Loan interest rate',
            };
        }
    }
};
exports.PDFExtractionProcessor = PDFExtractionProcessor;
__decorate([
    (0, bull_1.Process)('extract-pdf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PDFExtractionProcessor.prototype, "extractPdf", null);
exports.PDFExtractionProcessor = PDFExtractionProcessor = PDFExtractionProcessor_1 = __decorate([
    (0, bull_1.Processor)('pdf-extraction'),
    __metadata("design:paramtypes", [ai_service_1.AIService])
], PDFExtractionProcessor);
//# sourceMappingURL=pdf-extraction.processor.js.map