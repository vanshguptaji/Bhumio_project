import { Property } from '../../../database/entities/property.entity';
export declare class PropertyResponseDto {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date;
    static fromEntity(entity: Property): PropertyResponseDto;
    static fromEntities(entities: Property[]): PropertyResponseDto[];
}
