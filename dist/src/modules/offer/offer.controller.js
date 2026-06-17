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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const offer_service_1 = require("./offer.service");
const dto_1 = require("./dto");
let OfferController = class OfferController {
    offerService;
    constructor(offerService) {
        this.offerService = offerService;
    }
    async create(createDto) {
        return this.offerService.create(createDto);
    }
    async uploadOffer(files, propertyId, buyerName, buyerEmail, offerPrice, closingDays, inspectionContingency, financingContingency, appraisalContingency, lenderName, loanAmount, financingType, loanApproved, additionalConditions) {
        const inspection = inspectionContingency === undefined ? undefined : inspectionContingency === 'true';
        const financing = financingContingency === undefined ? undefined : financingContingency === 'true';
        const appraisal = appraisalContingency === undefined ? undefined : appraisalContingency === 'true';
        const approved = loanApproved === undefined ? undefined : loanApproved === 'true';
        return this.offerService.processUploadedFiles(propertyId, buyerName, buyerEmail, files, {
            offerPrice: offerPrice ? Number(offerPrice) : undefined,
            closingDays: closingDays ? Number(closingDays) : undefined,
            inspectionContingency: inspection,
            financingContingency: financing,
            appraisalContingency: appraisal,
            lenderName,
            loanAmount: loanAmount ? Number(loanAmount) : undefined,
            financingType,
            loanApproved: approved,
            additionalConditions,
        });
    }
    async findByProperty(propertyId) {
        return this.offerService.findByProperty(propertyId);
    }
    async updateStatus(id, status) {
        return this.offerService.updateStatus(id, status);
    }
};
exports.OfferController = OfferController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new offer via form input' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Offer created successfully',
        type: dto_1.OfferResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOfferDto]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'contract', maxCount: 1 },
        { name: 'loanApproval', maxCount: 1 },
    ])),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit an offer by uploading PDF contract and loan approval proof' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Documents processed and offer scored successfully',
        type: dto_1.OfferResponseDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('propertyId')),
    __param(2, (0, common_1.Body)('buyerName')),
    __param(3, (0, common_1.Body)('buyerEmail')),
    __param(4, (0, common_1.Body)('offerPrice')),
    __param(5, (0, common_1.Body)('closingDays')),
    __param(6, (0, common_1.Body)('inspectionContingency')),
    __param(7, (0, common_1.Body)('financingContingency')),
    __param(8, (0, common_1.Body)('appraisalContingency')),
    __param(9, (0, common_1.Body)('lenderName')),
    __param(10, (0, common_1.Body)('loanAmount')),
    __param(11, (0, common_1.Body)('financingType')),
    __param(12, (0, common_1.Body)('loanApproved')),
    __param(13, (0, common_1.Body)('additionalConditions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Number, Number, String, String, String, String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "uploadOffer", null);
__decorate([
    (0, common_1.Get)('property/:propertyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all offers submitted for a property' }),
    (0, swagger_1.ApiParam)({ name: 'propertyId', description: 'Property ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of offers for property',
        type: [dto_1.OfferResponseDto],
    }),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "findByProperty", null);
__decorate([
    (0, common_1.Post)(':id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Accept, Reject, or Counter an offer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Offer ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Offer status updated successfully',
        type: dto_1.OfferResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "updateStatus", null);
exports.OfferController = OfferController = __decorate([
    (0, swagger_1.ApiTags)('Offers'),
    (0, common_1.Controller)('api/v1/offers'),
    __metadata("design:paramtypes", [offer_service_1.OfferService])
], OfferController);
//# sourceMappingURL=offer.controller.js.map