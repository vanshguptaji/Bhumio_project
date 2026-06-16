import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Disclosure } from '../entities/disclosure.entity';

@Injectable()
export class DisclosureRepository extends Repository<Disclosure> {
  constructor(private dataSource: DataSource) {
    super(Disclosure, dataSource.createEntityManager());
  }

  async findByPropertyId(propertyId: string): Promise<Disclosure[]> {
    return this.find({
      where: { propertyId },
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findLatestByPropertyId(propertyId: string): Promise<Disclosure | null> {
    return this.findOne({
      where: { propertyId },
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findWithProperty(disclosureId: string): Promise<Disclosure | null> {
    return this.findOne({
      where: { id: disclosureId } as any,
      relations: { property: true } as any,
    });
  }
}
