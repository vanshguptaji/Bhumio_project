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
exports.DisclosureRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const disclosure_entity_1 = require("../entities/disclosure.entity");
let DisclosureRepository = class DisclosureRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(disclosure_entity_1.Disclosure, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findByPropertyId(propertyId) {
        return this.find({
            where: { propertyId },
            order: { createdAt: 'DESC' },
        });
    }
    async findLatestByPropertyId(propertyId) {
        return this.findOne({
            where: { propertyId },
            order: { createdAt: 'DESC' },
        });
    }
    async findWithProperty(disclosureId) {
        return this.findOne({
            where: { id: disclosureId },
            relations: { property: true },
        });
    }
};
exports.DisclosureRepository = DisclosureRepository;
exports.DisclosureRepository = DisclosureRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DisclosureRepository);
//# sourceMappingURL=disclosure.repository.js.map