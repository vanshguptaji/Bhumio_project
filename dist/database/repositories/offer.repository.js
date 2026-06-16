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
exports.OfferRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const offer_entity_1 = require("../entities/offer.entity");
let OfferRepository = class OfferRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(offer_entity_1.Offer, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findByPropertyId(propertyId) {
        return this.find({
            where: { propertyId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByPropertyIdWithLoans(propertyId) {
        return this.find({
            where: { propertyId },
            relations: { loanDocuments: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findWithLoans(offerId) {
        return this.findOne({
            where: { id: offerId },
            relations: {
                property: true,
                loanDocuments: true,
            },
        });
    }
    async findByBuyerEmail(buyerEmail) {
        return this.find({
            where: { buyerEmail },
            order: { createdAt: 'DESC' },
        });
    }
    async findByStrengthScoreRange(min, max, propertyId) {
        const query = this.createQueryBuilder('offer')
            .where('offer.strengthScore >= :min', { min })
            .andWhere('offer.strengthScore <= :max', { max });
        if (propertyId) {
            query.andWhere('offer.propertyId = :propertyId', { propertyId });
        }
        return query.orderBy('offer.strengthScore', 'DESC').getMany();
    }
};
exports.OfferRepository = OfferRepository;
exports.OfferRepository = OfferRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OfferRepository);
//# sourceMappingURL=offer.repository.js.map