import { DataSource, Repository } from 'typeorm';
import { Disclosure } from '../entities/disclosure.entity';
export declare class DisclosureRepository extends Repository<Disclosure> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByPropertyId(propertyId: string): Promise<Disclosure[]>;
    findLatestByPropertyId(propertyId: string): Promise<Disclosure | null>;
    findWithProperty(disclosureId: string): Promise<Disclosure | null>;
}
