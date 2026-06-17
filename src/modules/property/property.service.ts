import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from '../../database/repositories/property.repository';
import { OfferRepository } from '../../database/repositories/offer.repository';
import { CreatePropertyDto, PropertyResponseDto } from './dto';
import { Property } from '../../database/entities/property.entity';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly offerRepository: OfferRepository,
  ) {}

  async create(createDto: CreatePropertyDto): Promise<PropertyResponseDto> {
    this.logger.log(`Creating new property: ${createDto.address}, ${createDto.city}`);
    
    // Check if property with same address and zip code already exists
    const existing = await this.propertyRepository.findByAddressAndZip(
      createDto.address,
      createDto.zipCode,
    );
    
    if (existing) {
      this.logger.log(`Property already exists at ${createDto.address}`);
      return PropertyResponseDto.fromEntity(existing);
    }

    const property = await this.propertyRepository.save({
      address: createDto.address,
      city: createDto.city,
      state: createDto.state,
      zipCode: createDto.zipCode,
    } as Property);

    return PropertyResponseDto.fromEntity(property);
  }

  async findAll(): Promise<PropertyResponseDto[]> {
    this.logger.log('Fetching all properties');
    const properties = await this.propertyRepository.find({
      order: { createdAt: 'DESC' },
    });
    return PropertyResponseDto.fromEntities(properties);
  }

  async findById(id: string): Promise<PropertyResponseDto> {
    this.logger.log(`Fetching property by ID: ${id}`);
    const property = await this.propertyRepository.findOne({
      where: { id } as any,
    });
    
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return PropertyResponseDto.fromEntity(property);
  }

  async getDashboardData(propertyId: string): Promise<any> {
    this.logger.log(`Compiling dashboard data for property ID: ${propertyId}`);
    
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId } as any,
      relations: { disclosures: true } as any,
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }

    // Load offers with loan documents
    const offers = await this.offerRepository.findByPropertyIdWithLoans(propertyId);

    // Sort offers by strength score descending
    const sortedOffers = (offers || []).sort((a, b) => {
      const scoreA = Number(a.strengthScore || 0);
      const scoreB = Number(b.strengthScore || 0);
      return scoreB - scoreA;
    });

    return {
      ...PropertyResponseDto.fromEntity(property),
      disclosures: property.disclosures || [],
      offers: sortedOffers,
    };
  }
}
