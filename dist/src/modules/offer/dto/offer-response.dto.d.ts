import { Offer } from '../../../database/entities/offer.entity';
export declare class OfferResponseDto {
    id: string;
    propertyId: string;
    buyerName: string;
    buyerEmail: string;
    offerPrice: number;
    closingDays: number;
    inspectionContingency: boolean;
    financingContingency: boolean;
    appraisalContingency: boolean;
    additionalConditions: string;
    strengthScore: number;
    closingProbability: number;
    riskLevel: string;
    explanation: string;
    extractedData: any;
    loanDocuments: any[];
    createdAt: Date;
    static fromEntity(entity: Offer): OfferResponseDto;
    static fromEntities(entities: Offer[]): OfferResponseDto[];
}
