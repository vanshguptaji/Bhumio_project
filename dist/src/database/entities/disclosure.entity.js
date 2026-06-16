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
exports.Disclosure = void 0;
const typeorm_1 = require("typeorm");
const property_entity_1 = require("./property.entity");
let Disclosure = class Disclosure {
    id;
    propertyId;
    property;
    fileUrl;
    summary;
    structuralRisk;
    legalRisk;
    financialRisk;
    environmentalRisk;
    overallRisk;
    extractedData;
    createdAt;
    updatedAt;
};
exports.Disclosure = Disclosure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Disclosure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Disclosure.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.disclosures, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'propertyId' }),
    __metadata("design:type", property_entity_1.Property)
], Disclosure.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Disclosure.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Disclosure.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Disclosure.prototype, "structuralRisk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Disclosure.prototype, "legalRisk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Disclosure.prototype, "financialRisk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Disclosure.prototype, "environmentalRisk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Disclosure.prototype, "overallRisk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Disclosure.prototype, "extractedData", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Disclosure.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Disclosure.prototype, "updatedAt", void 0);
exports.Disclosure = Disclosure = __decorate([
    (0, typeorm_1.Entity)('disclosures')
], Disclosure);
//# sourceMappingURL=disclosure.entity.js.map