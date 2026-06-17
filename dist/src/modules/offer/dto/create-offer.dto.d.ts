export declare class CreateOfferDto {
    propertyId: string;
    buyerName: string;
    buyerEmail: string;
    offerPrice: number;
    closingDays: number;
    inspectionContingency?: boolean;
    financingContingency?: boolean;
    appraisalContingency?: boolean;
    additionalConditions?: string;
    lenderName?: string;
    loanAmount?: number;
    financingType?: string;
    loanApproved?: boolean;
}
