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
exports.DisclosureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const disclosure_service_1 = require("./disclosure.service");
const dto_1 = require("./dto");
let DisclosureController = class DisclosureController {
    disclosureService;
    constructor(disclosureService) {
        this.disclosureService = disclosureService;
    }
    async create(createDto) {
        return this.disclosureService.create(createDto);
    }
    async findAll() {
        return this.disclosureService.getAll();
    }
    async findById(id) {
        return this.disclosureService.findById(id);
    }
    async findByPropertyId(propertyId) {
        return this.disclosureService.findByPropertyId(propertyId);
    }
    async update(id, updateDto) {
        return this.disclosureService.update(id, updateDto);
    }
    async delete(id) {
        await this.disclosureService.delete(id);
    }
};
exports.DisclosureController = DisclosureController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new disclosure' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Disclosure created successfully',
        type: dto_1.DisclosureResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDisclosureDto]),
    __metadata("design:returntype", Promise)
], DisclosureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all disclosures' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all disclosures',
        type: [dto_1.DisclosureResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisclosureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get disclosure by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Disclosure ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Disclosure found',
        type: dto_1.DisclosureResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Disclosure not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisclosureController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('property/:propertyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all disclosures for a property' }),
    (0, swagger_1.ApiParam)({ name: 'propertyId', description: 'Property ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of disclosures for property',
        type: [dto_1.DisclosureResponseDto],
    }),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisclosureController.prototype, "findByPropertyId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update disclosure' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Disclosure ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Disclosure updated successfully',
        type: dto_1.DisclosureResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Disclosure not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateDisclosureDto]),
    __metadata("design:returntype", Promise)
], DisclosureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete disclosure' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Disclosure ID (UUID)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Disclosure deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Disclosure not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisclosureController.prototype, "delete", null);
exports.DisclosureController = DisclosureController = __decorate([
    (0, swagger_1.ApiTags)('Disclosures'),
    (0, common_1.Controller)('api/v1/disclosures'),
    __metadata("design:paramtypes", [disclosure_service_1.DisclosureService])
], DisclosureController);
//# sourceMappingURL=disclosure.controller.js.map