import { PropertyService } from './property.service';
import { CreatePropertyDto, PropertyResponseDto } from './dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createDto: CreatePropertyDto): Promise<PropertyResponseDto>;
    findAll(): Promise<PropertyResponseDto[]>;
    findById(id: string): Promise<PropertyResponseDto>;
    getDashboardData(id: string): Promise<any>;
}
