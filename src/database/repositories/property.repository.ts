import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Property } from '../entities/property.entity';

@Injectable()
export class PropertyRepository extends Repository<Property> {
  constructor(private dataSource: DataSource) {
    super(Property, dataSource.createEntityManager());
  }

  async findByAddressAndZip(
    address: string,
    zipCode: string,
  ): Promise<Property | null> {
    return this.findOne({
      where: { address, zipCode },
    });
  }

  async findWithDisclosures(propertyId: string): Promise<Property | null> {
    return this.findOne({
      where: { id: propertyId } as any,
      relations: { disclosures: true } as any,
    });
  }

  async findWithOffers(propertyId: string): Promise<Property | null> {
    return this.findOne({
      where: { id: propertyId } as any,
      relations: { offers: true } as any,
    });
  }

  async findWithAll(propertyId: string): Promise<Property | null> {
    return this.findOne({
      where: { id: propertyId } as any,
      relations: { disclosures: true, offers: true } as any,
    });
  }
}
