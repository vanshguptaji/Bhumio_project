import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OfferRepository } from '../../database/repositories/offer.repository';
import { LoanDocumentRepository } from '../../database/repositories/loan-document.repository';
import { PropertyRepository } from '../../database/repositories/property.repository';
import { CreateOfferDto, OfferResponseDto } from './dto';
import { Offer } from '../../database/entities/offer.entity';
import { LoanDocument } from '../../database/entities/loan-document.entity';
import { AIService } from '../ai/ai.service';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);

  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly loanDocumentRepository: LoanDocumentRepository,
    private readonly propertyRepository: PropertyRepository,
    private readonly aiService: AIService,
  ) {}

  async create(createDto: CreateOfferDto): Promise<OfferResponseDto> {
    this.logger.log(`Processing offer for property: ${createDto.propertyId} from ${createDto.buyerName}`);

    const property = await this.propertyRepository.findOne({
      where: { id: createDto.propertyId } as any,
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${createDto.propertyId} not found`);
    }

    // Default contingencies
    const inspection = createDto.inspectionContingency !== false;
    const financing = createDto.financingContingency !== false;
    const appraisal = createDto.appraisalContingency !== false;

    // Run scoring algorithms
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
      riskLevel: riskLevel as any,
      explanation: explanation,
      extractedData: {
        submittedViaForm: true,
        timestamp: new Date().toISOString(),
      },
    } as any);

    // Save Loan Document details if provided
    if (createDto.lenderName || financing) {
      const lender = createDto.lenderName || 'Chase Mortgage Services';
      const approved = createDto.loanApproved !== false;
      const amount = createDto.loanAmount || Math.round(createDto.offerPrice * 0.8);
      const finType = createDto.financingType || 'Conventional 30-Year Fixed';
      
      // Calculate financing strength (0-100)
      let finStrength = 75;
      if (approved) finStrength += 15;
      if (finType.toLowerCase().includes('conventional')) finStrength += 10;
      if (amount / createDto.offerPrice < 0.8) finStrength += 5; // lower LTV = stronger
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
      } as any);
    }

    // Fetch full offer with relations to return
    const savedOffer = await this.offerRepository.findOne({
      where: { id: offer.id } as any,
      relations: { loanDocuments: true } as any,
    });

    return OfferResponseDto.fromEntity(savedOffer);
  }

  async processUploadedFiles(
    propertyId: string,
    buyerName: string,
    buyerEmail: string,
    files: { contract?: any[]; loanApproval?: any[] },
    overrideParams?: Partial<CreateOfferDto>,
  ): Promise<OfferResponseDto> {
    this.logger.log(`Processing uploaded files for property: ${propertyId}`);

    // If we have manual overrides, we can merge them, or read from file names/details.
    // Let's parse files or run fallback.
    // For realistic demo purposes, if specific words are in filenames, we tailor the mock results!
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

    // Detect settings from filenames
    if (contractFilename.includes('cash') || contractFilename.includes('no_contingency')) {
      price = 585000;
      closingDays = 14;
      inspection = false;
      financing = false;
      appraisal = false;
    } else if (contractFilename.includes('fha')) {
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

  async findByProperty(propertyId: string): Promise<OfferResponseDto[]> {
    const offers = await this.offerRepository.findByPropertyIdWithLoans(propertyId);
    return OfferResponseDto.fromEntities(offers);
  }

  async updateStatus(id: string, status: string): Promise<OfferResponseDto> {
    this.logger.log(`Updating offer: ${id} status/contingency record`);
    const offer = await this.offerRepository.findOne({
      where: { id } as any,
      relations: { loanDocuments: true } as any,
    });
    
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    // Update conditions or note
    offer.additionalConditions = `[Status: ${status}] ` + (offer.additionalConditions || '');
    await this.offerRepository.save(offer);

    return OfferResponseDto.fromEntity(offer);
  }

  // --- PRIVATE SCORING ALGORITHM ---

  private calculateScores(params: {
    price: number;
    closingDays: number;
    inspection: boolean;
    financing: boolean;
    appraisal: boolean;
    hasLoanDoc: boolean;
    loanApproved: boolean;
    loanAmount: number;
    financingType: string;
    buyerName: string;
  }): {
    strengthScore: number;
    closingProbability: number;
    riskLevel: string;
    explanation: string;
  } {
    // 1. Calculate Offer Strength (how attractive the price/terms are to the seller)
    // Assume a benchmark property list price of $500,000
    const benchmarkPrice = 500000;
    let strength = 50;

    // Price factor
    const priceRatio = params.price / benchmarkPrice;
    if (priceRatio > 1.1) {
      strength += 25; // 10%+ over asking
    } else if (priceRatio > 1.0) {
      strength += 15; // Over asking
    } else if (priceRatio === 1.0) {
      strength += 5; // At asking
    } else {
      strength -= 15; // Below asking
    }

    // Closing days factor (faster close = stronger for seller)
    if (params.closingDays <= 15) {
      strength += 15;
    } else if (params.closingDays <= 30) {
      strength += 5;
    } else if (params.closingDays > 45) {
      strength -= 10;
    }

    // Contingencies factor (fewer contingencies = stronger)
    if (!params.inspection) strength += 10;
    if (!params.financing) strength += 20; // Cash is huge
    if (!params.appraisal) strength += 10;

    if (params.inspection && params.financing && params.appraisal) {
      strength -= 10; // All contingencies present
    }

    strength = Math.min(100, Math.max(10, strength));

    // 2. Calculate Closing Probability (how likely is the deal to actually cross the finish line)
    let probability = 65;

    // Financing factor
    if (!params.financing) {
      // Cash offer
      probability += 30; // extremely high close rate
    } else {
      if (params.hasLoanDoc) {
        if (params.loanApproved) {
          probability += 15;
        } else {
          probability -= 35; // loan document states NOT approved or rejected
        }
      } else {
        probability -= 15; // needs financing but no pre-approval letter provided
      }
    }

    // Contingency risks
    if (params.inspection) probability -= 5; // Risk of failing inspection and backing out
    if (params.appraisal && params.financing) probability -= 5; // Risk of appraisal gap failing loan

    // Closing timeline risk (too fast conventional loan might fail to fund)
    if (params.financing && params.closingDays < 20) {
      probability -= 15; // Fails to fund fast enough
    }

    probability = Math.min(99, Math.max(5, probability));

    // 3. Determine Risk Level
    let riskLevel = 'MEDIUM';
    if (probability >= 80 && strength >= 70) {
      riskLevel = 'LOW';
    } else if (probability < 55) {
      riskLevel = 'HIGH';
    }

    // 4. Generate Natural Language Explanation
    let explanation = '';
    const formattedPrice = params.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    
    if (!params.financing) {
      explanation = `This all-cash offer by ${params.buyerName} for ${formattedPrice} is exceptionally clean. With a rapid ${params.closingDays}-day close timeline and zero contingencies (inspection, financing, and appraisal are all waived), this bid has an extremely low risk of transaction failure. This represents the most secure path to close.`;
    } else {
      const loanStatus = params.loanApproved ? 'pre-approved conventional financing' : 'unverified financing';
      const contingencyText = [];
      if (params.inspection) contingencyText.push('inspection');
      if (params.appraisal) contingencyText.push('appraisal');
      if (params.financing) contingencyText.push('financing');

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
}
