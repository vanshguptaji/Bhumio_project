import { OfferRepository } from '../../database/repositories/offer.repository';
import { LoanDocumentRepository } from '../../database/repositories/loan-document.repository';
import { PropertyRepository } from '../../database/repositories/property.repository';
import { CreateOfferDto, OfferResponseDto } from './dto';
import { AIService } from '../ai/ai.service';
export declare class OfferService {
    private readonly offerRepository;
    private readonly loanDocumentRepository;
    private readonly propertyRepository;
    private readonly aiService;
    private readonly logger;
    constructor(offerRepository: OfferRepository, loanDocumentRepository: LoanDocumentRepository, propertyRepository: PropertyRepository, aiService: AIService);
    create(createDto: CreateOfferDto): Promise<OfferResponseDto>;
    processUploadedFiles(propertyId: string, buyerName: string, buyerEmail: string, files: {
        contract?: any[];
        loanApproval?: any[];
    }, overrideParams?: Partial<CreateOfferDto>): Promise<OfferResponseDto>;
    findByProperty(propertyId: string): Promise<OfferResponseDto[]>;
    updateStatus(id: string, status: string): Promise<OfferResponseDto>;
    private calculateScores;
}
