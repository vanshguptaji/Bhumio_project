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
exports.CreateOfferDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateOfferDto {
    propertyId;
    buyerName;
    buyerEmail;
    offerPrice;
    closingDays;
    inspectionContingency;
    financingContingency;
    appraisalContingency;
    additionalConditions;
    lenderName;
    loanAmount;
    financingType;
    loanApproved;
}
exports.CreateOfferDto = CreateOfferDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Property UUID the offer is for', example: 'uuid-here' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the buyer', example: 'Sarah Connor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "buyerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the buyer', example: 'sarah@skynet.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "buyerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numeric offer price in USD', example: 550000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "offerPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of days to close the transaction', example: 30 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "closingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether offer includes inspection contingency', example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "inspectionContingency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether offer includes financing contingency', example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "financingContingency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether offer includes appraisal contingency', example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "appraisalContingency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Any additional notes or conditions', example: 'Seller credit requested' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "additionalConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lender name', example: 'Chase Mortgage' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "lenderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loan amount', example: 400000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "loanAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Financing type', example: 'Conventional' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "financingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is loan approved', example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "loanApproved", void 0);
//# sourceMappingURL=create-offer.dto.js.map