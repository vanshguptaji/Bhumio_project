import { DisclosureService } from './disclosure.service';
import { CreateDisclosureDto, UpdateDisclosureDto, DisclosureResponseDto } from './dto';
export declare class DisclosureController {
    private readonly disclosureService;
    constructor(disclosureService: DisclosureService);
    create(createDto: CreateDisclosureDto): Promise<DisclosureResponseDto>;
    findAll(): Promise<DisclosureResponseDto[]>;
    findById(id: string): Promise<DisclosureResponseDto>;
    findByPropertyId(propertyId: string): Promise<DisclosureResponseDto[]>;
    update(id: string, updateDto: UpdateDisclosureDto): Promise<DisclosureResponseDto>;
    delete(id: string): Promise<void>;
}
