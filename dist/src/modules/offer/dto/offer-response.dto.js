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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OfferResponseDto {
    id;
    propertyId;
    buyerName;
    buyerEmail;
    offerPrice;
    closingDays;
    inspectionContingency;
    financingContingency;
    appraisalContingency;
    additionalConditions;
    strengthScore;
    closingProbability;
    riskLevel;
    explanation;
    extractedData;
    loanDocuments;
    createdAt;
    static fromEntity(entity) {
        if (!entity)
            return null;
        const dto = new OfferResponseDto();
        dto.id = entity.id;
        dto.propertyId = entity.propertyId;
        dto.buyerName = entity.buyerName;
        dto.buyerEmail = entity.buyerEmail;
        dto.offerPrice = Number(entity.offerPrice);
        dto.closingDays = entity.closingDays;
        dto.inspectionContingency = entity.inspectionContingency;
        dto.financingContingency = entity.financingContingency;
        dto.appraisalContingency = entity.appraisalContingency;
        dto.additionalConditions = entity.additionalConditions;
        dto.strengthScore = Number(entity.strengthScore || 0);
        dto.closingProbability = Number(entity.closingProbability || 0);
        dto.riskLevel = entity.riskLevel;
        dto.explanation = entity.explanation;
        dto.extractedData = entity.extractedData;
        dto.loanDocuments = entity.loanDocuments || [];
        dto.createdAt = entity.createdAt;
        return dto;
    }
    static fromEntities(entities) {
        return (entities || []).map(entity => this.fromEntity(entity));
    }
}
exports.OfferResponseDto = OfferResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Offer UUID' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Property UUID' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buyer name' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "buyerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Buyer email' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "buyerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Offer price' }),
    __metadata("design:type", Number)
], OfferResponseDto.prototype, "offerPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Closing timeline in days' }),
    __metadata("design:type", Number)
], OfferResponseDto.prototype, "closingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Inspection contingency flag' }),
    __metadata("design:type", Boolean)
], OfferResponseDto.prototype, "inspectionContingency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Financing contingency flag' }),
    __metadata("design:type", Boolean)
], OfferResponseDto.prototype, "financingContingency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Appraisal contingency flag' }),
    __metadata("design:type", Boolean)
], OfferResponseDto.prototype, "appraisalContingency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional conditions text' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "additionalConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI-generated strength score (0-100)' }),
    __metadata("design:type", Number)
], OfferResponseDto.prototype, "strengthScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI-generated closing probability (0-100)' }),
    __metadata("design:type", Number)
], OfferResponseDto.prototype, "closingProbability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI closing risk level (LOW, MEDIUM, HIGH)' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "riskLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI natural language explanation' }),
    __metadata("design:type", String)
], OfferResponseDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Extracted data JSON' }),
    __metadata("design:type", Object)
], OfferResponseDto.prototype, "extractedData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loan documents associated with offer' }),
    __metadata("design:type", Array)
], OfferResponseDto.prototype, "loanDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation date' }),
    __metadata("design:type", Date)
], OfferResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=offer-response.dto.js.map