import { Injectable, Logger } from '@nestjs/common';
import { DisclosureRepository } from '../../database/repositories/disclosure.repository';
import {
  CreateDisclosureDto,
  UpdateDisclosureDto,
  DisclosureResponseDto,
} from './dto';
import { Disclosure } from '../../database/entities/disclosure.entity';
import { EntityNotFoundException } from '../../database/exceptions/database.exception';

@Injectable()
export class DisclosureService {
  private readonly logger = new Logger(DisclosureService.name);

  constructor(private readonly disclosureRepository: DisclosureRepository) {}

  async create(createDto: CreateDisclosureDto): Promise<DisclosureResponseDto> {
    this.logger.log(
      `Creating disclosure for property: ${createDto.propertyId}`,
    );

    const disclosure = await this.disclosureRepository.save({
      propertyId: createDto.propertyId,
      fileUrl: createDto.fileUrl,
    } as Disclosure);

    return DisclosureResponseDto.fromEntity(disclosure);
  }

  async findById(id: string): Promise<DisclosureResponseDto> {
    this.logger.log(`Fetching disclosure: ${id}`);

    const disclosure = await this.disclosureRepository.findOne({
      where: { id } as any,
    });

    if (!disclosure) {
      throw new EntityNotFoundException('Disclosure', id);
    }

    return DisclosureResponseDto.fromEntity(disclosure);
  }

  async findByPropertyId(propertyId: string): Promise<DisclosureResponseDto[]> {
    this.logger.log(`Fetching disclosures for property: ${propertyId}`);

    const disclosures = await this.disclosureRepository.findByPropertyId(
      propertyId,
    );

    return DisclosureResponseDto.fromEntities(disclosures);
  }

  async findLatestByPropertyId(
    propertyId: string,
  ): Promise<DisclosureResponseDto | null> {
    this.logger.log(`Fetching latest disclosure for property: ${propertyId}`);

    const disclosure =
      await this.disclosureRepository.findLatestByPropertyId(propertyId);

    return disclosure ? DisclosureResponseDto.fromEntity(disclosure) : null;
  }

  async update(
    id: string,
    updateDto: UpdateDisclosureDto,
  ): Promise<DisclosureResponseDto> {
    this.logger.log(`Updating disclosure: ${id}`);

    const disclosure = await this.findById(id);
    if (!disclosure) {
      throw new EntityNotFoundException('Disclosure', id);
    }

    const updated = await this.disclosureRepository.update(
      { id } as any,
      updateDto,
    );

    const result = await this.disclosureRepository.findOne({
      where: { id } as any,
    });

    return DisclosureResponseDto.fromEntity(result);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Deleting disclosure: ${id}`);

    const result = await this.disclosureRepository.delete({ id } as any);

    return (result.affected || 0) > 0;
  }

  async updateAnalysis(
    id: string,
    analysis: {
      summary?: string;
      structuralRisk?: number;
      legalRisk?: number;
      financialRisk?: number;
      environmentalRisk?: number;
      overallRisk?: number;
      extractedData?: Record<string, any>;
    },
  ): Promise<DisclosureResponseDto> {
    this.logger.log(`Updating analysis for disclosure: ${id}`);

    await this.disclosureRepository.update({ id } as any, analysis);

    const updated = await this.disclosureRepository.findOne({
      where: { id } as any,
    });

    return DisclosureResponseDto.fromEntity(updated);
  }

  async getAll(): Promise<DisclosureResponseDto[]> {
    this.logger.log('Fetching all disclosures');

    const disclosures = await this.disclosureRepository.find();

    return DisclosureResponseDto.fromEntities(disclosures);
  }
}
