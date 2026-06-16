import { Property } from './property.entity';
import { LoanDocument } from './loan-document.entity';
export declare class Offer {
    id: string;
    propertyId: string;
    property: Property;
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
    extractedData: Record<string, any>;
    loanDocuments: LoanDocument[];
    createdAt: Date;
    updatedAt: Date;
}
