import { OfferService } from './offer.service';
import { CreateOfferDto, OfferResponseDto } from './dto';
export declare class OfferController {
    private readonly offerService;
    constructor(offerService: OfferService);
    create(createDto: CreateOfferDto): Promise<OfferResponseDto>;
    uploadOffer(files: {
        contract?: any[];
        loanApproval?: any[];
    }, propertyId: string, buyerName: string, buyerEmail: string, offerPrice?: number, closingDays?: number, inspectionContingency?: string, financingContingency?: string, appraisalContingency?: string, lenderName?: string, loanAmount?: number, financingType?: string, loanApproved?: string, additionalConditions?: string): Promise<OfferResponseDto>;
    findByProperty(propertyId: string): Promise<OfferResponseDto[]>;
    updateStatus(id: string, status: string): Promise<OfferResponseDto>;
}
