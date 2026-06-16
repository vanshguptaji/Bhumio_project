import { DisclosureRepository } from '../../database/repositories/disclosure.repository';
import { CreateDisclosureDto, UpdateDisclosureDto, DisclosureResponseDto } from './dto';
export declare class DisclosureService {
    private readonly disclosureRepository;
    private readonly logger;
    constructor(disclosureRepository: DisclosureRepository);
    create(createDto: CreateDisclosureDto): Promise<DisclosureResponseDto>;
    findById(id: string): Promise<DisclosureResponseDto>;
    findByPropertyId(propertyId: string): Promise<DisclosureResponseDto[]>;
    findLatestByPropertyId(propertyId: string): Promise<DisclosureResponseDto | null>;
    update(id: string, updateDto: UpdateDisclosureDto): Promise<DisclosureResponseDto>;
    delete(id: string): Promise<boolean>;
    updateAnalysis(id: string, analysis: {
        summary?: string;
        structuralRisk?: number;
        legalRisk?: number;
        financialRisk?: number;
        environmentalRisk?: number;
        overallRisk?: number;
        extractedData?: Record<string, any>;
    }): Promise<DisclosureResponseDto>;
    getAll(): Promise<DisclosureResponseDto[]>;
}
