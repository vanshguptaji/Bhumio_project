import { DataSource, Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';
export declare class OfferRepository extends Repository<Offer> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByPropertyId(propertyId: string): Promise<Offer[]>;
    findByPropertyIdWithLoans(propertyId: string): Promise<Offer[]>;
    findWithLoans(offerId: string): Promise<Offer | null>;
    findByBuyerEmail(buyerEmail: string): Promise<Offer[]>;
    findByStrengthScoreRange(min: number, max: number, propertyId?: string): Promise<Offer[]>;
}
