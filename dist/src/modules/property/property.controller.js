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
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const property_service_1 = require("./property.service");
const dto_1 = require("./dto");
let PropertyController = class PropertyController {
    propertyService;
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    async create(createDto) {
        return this.propertyService.create(createDto);
    }
    async findAll() {
        return this.propertyService.findAll();
    }
    async findById(id) {
        return this.propertyService.findById(id);
    }
    async getDashboardData(id) {
        return this.propertyService.getDashboardData(id);
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.Post)('api/v1/properties'),
    (0, common_1.Post)('property'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new property' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Property created successfully',
        type: dto_1.PropertyResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePropertyDto]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('api/v1/properties'),
    (0, common_1.Get)('property'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all properties' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all properties',
        type: [dto_1.PropertyResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('api/v1/properties/:id'),
    (0, common_1.Get)('property/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get property by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Property ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Property found',
        type: dto_1.PropertyResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Property not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get aggregated property intelligence dashboard data' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Property ID (UUID)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Property disclosures and ranked offers loaded successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Property not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getDashboardData", null);
exports.PropertyController = PropertyController = __decorate([
    (0, swagger_1.ApiTags)('Properties'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map