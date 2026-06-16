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
exports.DisclosureResponseDto = void 0;
const class_validator_1 = require("class-validator");
class DisclosureResponseDto {
    id;
    propertyId;
    fileUrl;
    summary;
    structuralRisk;
    legalRisk;
    financialRisk;
    environmentalRisk;
    overallRisk;
    createdAt;
    updatedAt;
    static fromEntity(disclosure) {
        return {
            id: disclosure.id,
            propertyId: disclosure.propertyId,
            fileUrl: disclosure.fileUrl,
            summary: disclosure.summary,
            structuralRisk: disclosure.structuralRisk,
            legalRisk: disclosure.legalRisk,
            financialRisk: disclosure.financialRisk,
            environmentalRisk: disclosure.environmentalRisk,
            overallRisk: disclosure.overallRisk,
            createdAt: disclosure.createdAt,
            updatedAt: disclosure.updatedAt,
        };
    }
    static fromEntities(disclosures) {
        return disclosures.map((disclosure) => DisclosureResponseDto.fromEntity(disclosure));
    }
}
exports.DisclosureResponseDto = DisclosureResponseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DisclosureResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DisclosureResponseDto.prototype, "propertyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DisclosureResponseDto.prototype, "fileUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DisclosureResponseDto.prototype, "summary", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DisclosureResponseDto.prototype, "structuralRisk", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DisclosureResponseDto.prototype, "legalRisk", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DisclosureResponseDto.prototype, "financialRisk", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DisclosureResponseDto.prototype, "environmentalRisk", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DisclosureResponseDto.prototype, "overallRisk", void 0);
//# sourceMappingURL=disclosure-response.dto.js.map