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
exports.PropertyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const property_entity_1 = require("../entities/property.entity");
let PropertyRepository = class PropertyRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(property_entity_1.Property, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findByAddressAndZip(address, zipCode) {
        return this.findOne({
            where: { address, zipCode },
        });
    }
    async findWithDisclosures(propertyId) {
        return this.findOne({
            where: { id: propertyId },
            relations: { disclosures: true },
        });
    }
    async findWithOffers(propertyId) {
        return this.findOne({
            where: { id: propertyId },
            relations: { offers: true },
        });
    }
    async findWithAll(propertyId) {
        return this.findOne({
            where: { id: propertyId },
            relations: { disclosures: true, offers: true },
        });
    }
};
exports.PropertyRepository = PropertyRepository;
exports.PropertyRepository = PropertyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PropertyRepository);
//# sourceMappingURL=property.repository.js.map