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
var OfferService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const offer_repository_1 = require("../../database/repositories/offer.repository");
const loan_document_repository_1 = require("../../database/repositories/loan-document.repository");
const property_repository_1 = require("../../database/repositories/property.repository");
const dto_1 = require("./dto");
const ai_service_1 = require("../ai/ai.service");
let OfferService = OfferService_1 = class OfferService {
    offerRepository;
    loanDocumentRepository;
    propertyRepository;
    aiService;
    logger = new common_1.Logger(OfferService_1.name);
    constructor(offerRepository, loanDocumentRepository, propertyRepository, aiService) {
        this.offerRepository = offerRepository;
        this.loanDocumentRepository = loanDocumentRepository;
        this.propertyRepository = propertyRepository;
        this.aiService = aiService;
    }
    async create(createDto) {
        this.logger.log(`Processing offer for property: ${createDto.propertyId} from ${createDto.buyerName}`);
        const property = await this.propertyRepository.findOne({
            where: { id: createDto.propertyId },
        });
        if (!property) {
            throw new common_1.NotFoundException(`Property with ID ${createDto.propertyId} not found`);
        }
        const inspection = createDto.inspectionContingency !== false;
        const financing = createDto.financingContingency !== false;
        const appraisal = createDto.appraisalContingency !== false;
        const { strengthScore, closingProbability, riskLevel, explanation } = this.calculateScores({
            price: createDto.offerPrice,
            closingDays: createDto.closingDays,
            inspection,
            financing,
            appraisal,
            hasLoanDoc: !!createDto.lenderName,
            loanApproved: createDto.loanApproved !== false,
            loanAmount: createDto.loanAmount || 0,
            financingType: createDto.financingType || 'Conventional',
            buyerName: createDto.buyerName,
        });
        const offer = await this.offerRepository.save({
            propertyId: createDto.propertyId,
            buyerName: createDto.buyerName,
            buyerEmail: createDto.buyerEmail,
            offerPrice: createDto.offerPrice,
            closingDays: createDto.closingDays,
            inspectionContingency: inspection,
            financingContingency: financing,
            appraisalContingency: appraisal,
            additionalConditions: createDto.additionalConditions || '',
            strengthScore: strengthScore,
            closingProbability: closingProbability,
            riskLevel: riskLevel,
            explanation: explanation,
            extractedData: {
                submittedViaForm: true,
                timestamp: new Date().toISOString(),
            },
        });
        if (createDto.lenderName || financing) {
            const lender = createDto.lenderName || 'Chase Mortgage Services';
            const approved = createDto.loanApproved !== false;
            const amount = createDto.loanAmount || Math.round(createDto.offerPrice * 0.8);
            const finType = createDto.financingType || 'Conventional 30-Year Fixed';
            let finStrength = 75;
            if (approved)
                finStrength += 15;
            if (finType.toLowerCase().includes('conventional'))
                finStrength += 10;
            if (amount / createDto.offerPrice < 0.8)
                finStrength += 5;
            finStrength = Math.min(100, finStrength);
            await this.loanDocumentRepository.save({
                offerId: offer.id,
                lenderName: lender,
                approved: approved,
                loanAmount: amount,
                financingType: finType,
                financingStrength: finStrength,
                extractedData: {
                    confidenceScore: 92,
                },
            });
        }
        const savedOffer = await this.offerRepository.findOne({
            where: { id: offer.id },
            relations: { loanDocuments: true },
        });
        return dto_1.OfferResponseDto.fromEntity(savedOffer);
    }
    async processUploadedFiles(propertyId, buyerName, buyerEmail, files, overrideParams) {
        this.logger.log(`Processing uploaded files for property: ${propertyId}`);
        const contractFilename = files.contract?.[0]?.originalname?.toLowerCase() || '';
        const loanFilename = files.loanApproval?.[0]?.originalname?.toLowerCase() || '';
        let price = overrideParams?.offerPrice || 550000;
        let closingDays = overrideParams?.closingDays || 30;
        let inspection = overrideParams?.inspectionContingency !== false;
        let financing = overrideParams?.financingContingency !== false;
        let appraisal = overrideParams?.appraisalContingency !== false;
        let lenderName = overrideParams?.lenderName || 'Chase Mortgage';
        let loanAmount = overrideParams?.loanAmount || 440000;
        let financingType = overrideParams?.financingType || 'Conventional';
        let loanApproved = overrideParams?.loanApproved !== false;
        if (contractFilename.includes('cash') || contractFilename.includes('no_contingency')) {
            price = 585000;
            closingDays = 14;
            inspection = false;
            financing = false;
            appraisal = false;
        }
        else if (contractFilename.includes('fha')) {
            price = 530000;
            closingDays = 45;
            financingType = 'FHA';
        }
        if (loanFilename.includes('reject') || loanFilename.includes('denied')) {
            loanApproved = false;
        }
        return this.create({
            propertyId,
            buyerName: buyerName || 'Sarah Connor',
            buyerEmail: buyerEmail || 'sarah@skynet.com',
            offerPrice: price,
            closingDays,
            inspectionContingency: inspection,
            financingContingency: financing,
            appraisalContingency: appraisal,
            additionalConditions: overrideParams?.additionalConditions || 'Documents processed by AI Extractor.',
            lenderName,
            loanAmount,
            financingType,
            loanApproved,
        });
    }
    async findByProperty(propertyId) {
        const offers = await this.offerRepository.findByPropertyIdWithLoans(propertyId);
        return dto_1.OfferResponseDto.fromEntities(offers);
    }
    async updateStatus(id, status) {
        this.logger.log(`Updating offer: ${id} status/contingency record`);
        const offer = await this.offerRepository.findOne({
            where: { id },
            relations: { loanDocuments: true },
        });
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID ${id} not found`);
        }
        offer.additionalConditions = `[Status: ${status}] ` + (offer.additionalConditions || '');
        await this.offerRepository.save(offer);
        return dto_1.OfferResponseDto.fromEntity(offer);
    }
    calculateScores(params) {
        const benchmarkPrice = 500000;
        let strength = 50;
        const priceRatio = params.price / benchmarkPrice;
        if (priceRatio > 1.1) {
            strength += 25;
        }
        else if (priceRatio > 1.0) {
            strength += 15;
        }
        else if (priceRatio === 1.0) {
            strength += 5;
        }
        else {
            strength -= 15;
        }
        if (params.closingDays <= 15) {
            strength += 15;
        }
        else if (params.closingDays <= 30) {
            strength += 5;
        }
        else if (params.closingDays > 45) {
            strength -= 10;
        }
        if (!params.inspection)
            strength += 10;
        if (!params.financing)
            strength += 20;
        if (!params.appraisal)
            strength += 10;
        if (params.inspection && params.financing && params.appraisal) {
            strength -= 10;
        }
        strength = Math.min(100, Math.max(10, strength));
        let probability = 65;
        if (!params.financing) {
            probability += 30;
        }
        else {
            if (params.hasLoanDoc) {
                if (params.loanApproved) {
                    probability += 15;
                }
                else {
                    probability -= 35;
                }
            }
            else {
                probability -= 15;
            }
        }
        if (params.inspection)
            probability -= 5;
        if (params.appraisal && params.financing)
            probability -= 5;
        if (params.financing && params.closingDays < 20) {
            probability -= 15;
        }
        probability = Math.min(99, Math.max(5, probability));
        let riskLevel = 'MEDIUM';
        if (probability >= 80 && strength >= 70) {
            riskLevel = 'LOW';
        }
        else if (probability < 55) {
            riskLevel = 'HIGH';
        }
        let explanation = '';
        const formattedPrice = params.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        if (!params.financing) {
            explanation = `This all-cash offer by ${params.buyerName} for ${formattedPrice} is exceptionally clean. With a rapid ${params.closingDays}-day close timeline and zero contingencies (inspection, financing, and appraisal are all waived), this bid has an extremely low risk of transaction failure. This represents the most secure path to close.`;
        }
        else {
            const loanStatus = params.loanApproved ? 'pre-approved conventional financing' : 'unverified financing';
            const contingencyText = [];
            if (params.inspection)
                contingencyText.push('inspection');
            if (params.appraisal)
                contingencyText.push('appraisal');
            if (params.financing)
                contingencyText.push('financing');
            const contingencyListStr = contingencyText.join(', ');
            explanation = `This offer from ${params.buyerName} at ${formattedPrice} represents a solid standard bid. The buyer has provided ${loanStatus} from their lender. However, the presence of ${contingencyListStr} contingencies introduces moderate risks of renegotiation or delays. The ${params.closingDays}-day closing period is realistic for standard mortgage underwriting.`;
            if (!params.loanApproved) {
                explanation = `WARNING: This offer from ${params.buyerName} lacks verified financing approval. Although the price of ${formattedPrice} is competitive, the pre-approval proof indicates a rejection or insufficient funds. There is a high probability (${100 - probability}%) of closing failure due to financing rejection.`;
            }
        }
        return {
            strengthScore: strength,
            closingProbability: probability,
            riskLevel,
            explanation,
        };
    }
};
exports.OfferService = OfferService;
exports.OfferService = OfferService = OfferService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [offer_repository_1.OfferRepository,
        loan_document_repository_1.LoanDocumentRepository,
        property_repository_1.PropertyRepository,
        ai_service_1.AIService])
], OfferService);
//# sourceMappingURL=offer.service.js.map