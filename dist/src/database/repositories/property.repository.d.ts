import { DataSource, Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
export declare class PropertyRepository extends Repository<Property> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByAddressAndZip(address: string, zipCode: string): Promise<Property | null>;
    findWithDisclosures(propertyId: string): Promise<Property | null>;
    findWithOffers(propertyId: string): Promise<Property | null>;
    findWithAll(propertyId: string): Promise<Property | null>;
}
