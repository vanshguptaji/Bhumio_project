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
var DisclosureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclosureService = void 0;
const common_1 = require("@nestjs/common");
const disclosure_repository_1 = require("../../database/repositories/disclosure.repository");
const dto_1 = require("./dto");
const database_exception_1 = require("../../database/exceptions/database.exception");
let DisclosureService = DisclosureService_1 = class DisclosureService {
    disclosureRepository;
    logger = new common_1.Logger(DisclosureService_1.name);
    constructor(disclosureRepository) {
        this.disclosureRepository = disclosureRepository;
    }
    async create(createDto) {
        this.logger.log(`Creating disclosure for property: ${createDto.propertyId}`);
        const disclosure = await this.disclosureRepository.save({
            propertyId: createDto.propertyId,
            fileUrl: createDto.fileUrl,
        });
        return dto_1.DisclosureResponseDto.fromEntity(disclosure);
    }
    async findById(id) {
        this.logger.log(`Fetching disclosure: ${id}`);
        const disclosure = await this.disclosureRepository.findOne({
            where: { id },
        });
        if (!disclosure) {
            throw new database_exception_1.EntityNotFoundException('Disclosure', id);
        }
        return dto_1.DisclosureResponseDto.fromEntity(disclosure);
    }
    async findByPropertyId(propertyId) {
        this.logger.log(`Fetching disclosures for property: ${propertyId}`);
        const disclosures = await this.disclosureRepository.findByPropertyId(propertyId);
        return dto_1.DisclosureResponseDto.fromEntities(disclosures);
    }
    async findLatestByPropertyId(propertyId) {
        this.logger.log(`Fetching latest disclosure for property: ${propertyId}`);
        const disclosure = await this.disclosureRepository.findLatestByPropertyId(propertyId);
        return disclosure ? dto_1.DisclosureResponseDto.fromEntity(disclosure) : null;
    }
    async update(id, updateDto) {
        this.logger.log(`Updating disclosure: ${id}`);
        const disclosure = await this.findById(id);
        if (!disclosure) {
            throw new database_exception_1.EntityNotFoundException('Disclosure', id);
        }
        const updated = await this.disclosureRepository.update({ id }, updateDto);
        const result = await this.disclosureRepository.findOne({
            where: { id },
        });
        return dto_1.DisclosureResponseDto.fromEntity(result);
    }
    async delete(id) {
        this.logger.log(`Deleting disclosure: ${id}`);
        const result = await this.disclosureRepository.delete({ id });
        return (result.affected || 0) > 0;
    }
    async updateAnalysis(id, analysis) {
        this.logger.log(`Updating analysis for disclosure: ${id}`);
        await this.disclosureRepository.update({ id }, analysis);
        const updated = await this.disclosureRepository.findOne({
            where: { id },
        });
        return dto_1.DisclosureResponseDto.fromEntity(updated);
    }
    async getAll() {
        this.logger.log('Fetching all disclosures');
        const disclosures = await this.disclosureRepository.find();
        return dto_1.DisclosureResponseDto.fromEntities(disclosures);
    }
};
exports.DisclosureService = DisclosureService;
exports.DisclosureService = DisclosureService = DisclosureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [disclosure_repository_1.DisclosureRepository])
], DisclosureService);
//# sourceMappingURL=disclosure.service.js.map