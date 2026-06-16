import { DataSource, Repository } from 'typeorm';
import { LoanDocument } from '../entities/loan-document.entity';
export declare class LoanDocumentRepository extends Repository<LoanDocument> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByOfferId(offerId: string): Promise<LoanDocument[]>;
    findLatestByOfferId(offerId: string): Promise<LoanDocument | null>;
    findApprovedByOfferId(offerId: string): Promise<LoanDocument[]>;
    findWithOffer(loanId: string): Promise<LoanDocument | null>;
    findByLenderName(lenderName: string): Promise<LoanDocument[]>;
}
