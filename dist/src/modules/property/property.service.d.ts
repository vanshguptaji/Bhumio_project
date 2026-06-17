import { PropertyRepository } from '../../database/repositories/property.repository';
import { OfferRepository } from '../../database/repositories/offer.repository';
import { CreatePropertyDto, PropertyResponseDto } from './dto';
export declare class PropertyService {
    private readonly propertyRepository;
    private readonly offerRepository;
    private readonly logger;
    constructor(propertyRepository: PropertyRepository, offerRepository: OfferRepository);
    create(createDto: CreatePropertyDto): Promise<PropertyResponseDto>;
    findAll(): Promise<PropertyResponseDto[]>;
    findById(id: string): Promise<PropertyResponseDto>;
    getDashboardData(propertyId: string): Promise<any>;
}
