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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var QueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
let QueueService = QueueService_1 = class QueueService {
    disclosureQueue;
    pdfQueue;
    logger = new common_1.Logger(QueueService_1.name);
    constructor(disclosureQueue, pdfQueue) {
        this.disclosureQueue = disclosureQueue;
        this.pdfQueue = pdfQueue;
    }
    async addDisclosureAnalysis(disclosureId, text) {
        this.logger.log(`Adding disclosure analysis job for ${disclosureId}`);
        await this.disclosureQueue.add('analyze-disclosure', {
            disclosureId,
            text,
        }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        });
        this.logger.log(`Disclosure analysis job queued for ${disclosureId}`);
    }
    async addPdfExtraction(fileUrl, documentType, offerId) {
        this.logger.log(`Adding PDF extraction job for ${fileUrl}`);
        await this.pdfQueue.add('extract-pdf', {
            fileUrl,
            documentType,
            offerId,
        }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        });
        this.logger.log(`PDF extraction job queued for ${fileUrl}`);
    }
    async getDisclosureQueueStats() {
        return {
            active: await this.disclosureQueue.getActiveCount(),
            completed: await this.disclosureQueue.getCompletedCount(),
            failed: await this.disclosureQueue.getFailedCount(),
            delayed: await this.disclosureQueue.getDelayedCount(),
        };
    }
    async getPdfQueueStats() {
        return {
            active: await this.pdfQueue.getActiveCount(),
            completed: await this.pdfQueue.getCompletedCount(),
            failed: await this.pdfQueue.getFailedCount(),
            delayed: await this.pdfQueue.getDelayedCount(),
        };
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = QueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('disclosure-processing')),
    __param(1, (0, bull_1.InjectQueue)('pdf-extraction')),
    __metadata("design:paramtypes", [Object, Object])
], QueueService);
//# sourceMappingURL=queue.service.js.map