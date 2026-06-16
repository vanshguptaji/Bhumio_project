import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LoanDocument } from '../entities/loan-document.entity';

@Injectable()
export class LoanDocumentRepository extends Repository<LoanDocument> {
  constructor(private dataSource: DataSource) {
    super(LoanDocument, dataSource.createEntityManager());
  }

  async findByOfferId(offerId: string): Promise<LoanDocument[]> {
    return this.find({
      where: { offerId },
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findLatestByOfferId(offerId: string): Promise<LoanDocument | null> {
    return this.findOne({
      where: { offerId },
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findApprovedByOfferId(offerId: string): Promise<LoanDocument[]> {
    return this.find({
      where: { offerId, approved: true },
    });
  }

  async findWithOffer(loanId: string): Promise<LoanDocument | null> {
    return this.findOne({
      where: { id: loanId } as any,
      relations: { offer: true } as any,
    });
  }

  async findByLenderName(lenderName: string): Promise<LoanDocument[]> {
    return this.find({
      where: { lenderName },
      order: { createdAt: 'DESC' } as any,
    });
  }
}
