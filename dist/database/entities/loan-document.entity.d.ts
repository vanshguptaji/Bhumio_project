import { Offer } from './offer.entity';
export declare class LoanDocument {
    id: string;
    offerId: string;
    offer: Offer;
    lenderName: string;
    approved: boolean;
    loanAmount: number;
    financingType: string;
    financingStrength: number;
    extractedData: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
