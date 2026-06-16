import { Property } from './property.entity';
export declare class Disclosure {
    id: string;
    propertyId: string;
    property: Property;
    fileUrl: string;
    summary: string;
    structuralRisk: number;
    legalRisk: number;
    financialRisk: number;
    environmentalRisk: number;
    overallRisk: number;
    extractedData: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
