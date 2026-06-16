import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OfferRepository extends Repository<Offer> {
  constructor(private dataSource: DataSource) {
    super(Offer, dataSource.createEntityManager());
  }

  async findByPropertyId(propertyId: string): Promise<Offer[]> {
    return this.find({
      where: { propertyId },
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findByPropertyIdWithLoans(propertyId: string): Promise<Offer[]> {
    return this.find({
      where: { propertyId },
      relations: { loanDocuments: true } as any,
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findWithLoans(offerId: string): Promise<Offer | null> {
    return this.findOne({
      where: { id: offerId } as any,
      relations: {
        property: true,
        loanDocuments: true,
      } as any,
    });
  }

  async findByBuyerEmail(buyerEmail: string): Promise<Offer[]> {
    return this.find({
      where: { buyerEmail },
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findByStrengthScoreRange(
    min: number,
    max: number,
    propertyId?: string,
  ): Promise<Offer[]> {
    const query = this.createQueryBuilder('offer')
      .where('offer.strengthScore >= :min', { min })
      .andWhere('offer.strengthScore <= :max', { max });

    if (propertyId) {
      query.andWhere('offer.propertyId = :propertyId', { propertyId });
    }

    return query.orderBy('offer.strengthScore', 'DESC').getMany();
  }
}
