import { Disclosure } from '../../../database/entities/disclosure.entity';
export declare class DisclosureResponseDto {
    id: string;
    propertyId: string;
    fileUrl: string;
    summary?: string;
    structuralRisk?: number;
    legalRisk?: number;
    financialRisk?: number;
    environmentalRisk?: number;
    overallRisk?: number;
    createdAt: Date;
    updatedAt: Date;
    static fromEntity(disclosure: Disclosure): DisclosureResponseDto;
    static fromEntities(disclosures: Disclosure[]): DisclosureResponseDto[];
}
