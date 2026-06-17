"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_config_1 = require("../config/database.config");
const repositories_1 = require("./repositories");
const entities_1 = require("./entities");
const database_service_1 = require("./database.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot((0, database_config_1.databaseConfig)()),
            typeorm_1.TypeOrmModule.forFeature([entities_1.Property, entities_1.Disclosure, entities_1.Offer, entities_1.LoanDocument]),
        ],
        providers: [
            database_service_1.DatabaseService,
            {
                provide: repositories_1.PropertyRepository,
                inject: [typeorm_2.DataSource],
                useFactory: (dataSource) => new repositories_1.PropertyRepository(dataSource),
            },
            {
                provide: repositories_1.DisclosureRepository,
                inject: [typeorm_2.DataSource],
                useFactory: (dataSource) => new repositories_1.DisclosureRepository(dataSource),
            },
            {
                provide: repositories_1.OfferRepository,
                inject: [typeorm_2.DataSource],
                useFactory: (dataSource) => new repositories_1.OfferRepository(dataSource),
            },
            {
                provide: repositories_1.LoanDocumentRepository,
                inject: [typeorm_2.DataSource],
                useFactory: (dataSource) => new repositories_1.LoanDocumentRepository(dataSource),
            },
        ],
        exports: [
            database_service_1.DatabaseService,
            repositories_1.PropertyRepository,
            repositories_1.DisclosureRepository,
            repositories_1.OfferRepository,
            repositories_1.LoanDocumentRepository,
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map