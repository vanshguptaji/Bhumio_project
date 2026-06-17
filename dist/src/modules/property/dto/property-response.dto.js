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
exports.PropertyResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PropertyResponseDto {
    id;
    address;
    city;
    state;
    zipCode;
    createdAt;
    updatedAt;
    static fromEntity(entity) {
        if (!entity)
            return null;
        const dto = new PropertyResponseDto();
        dto.id = entity.id;
        dto.address = entity.address;
        dto.city = entity.city;
        dto.state = entity.state;
        dto.zipCode = entity.zipCode;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
    static fromEntities(entities) {
        return (entities || []).map(entity => this.fromEntity(entity));
    }
}
exports.PropertyResponseDto = PropertyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Property UUID' }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Street address' }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City' }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'State' }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Zip code' }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date created' }),
    __metadata("design:type", Date)
], PropertyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date last updated' }),
    __metadata("design:type", Date)
], PropertyResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=property-response.dto.js.map