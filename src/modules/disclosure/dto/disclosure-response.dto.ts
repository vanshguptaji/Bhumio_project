import { Disclosure } from '../../../database/entities/disclosure.entity';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class DisclosureResponseDto {
  @IsString()
  id: string;

  @IsString()
  propertyId: string;

  @IsString()
  fileUrl: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsOptional()
  structuralRisk?: number;

  @IsNumber()
  @IsOptional()
  legalRisk?: number;

  @IsNumber()
  @IsOptional()
  financialRisk?: number;

  @IsNumber()
  @IsOptional()
  environmentalRisk?: number;

  @IsNumber()
  @IsOptional()
  overallRisk?: number;

  createdAt: Date;
  updatedAt: Date;

  static fromEntity(disclosure: Disclosure): DisclosureResponseDto {
    return {
      id: disclosure.id,
      propertyId: disclosure.propertyId,
      fileUrl: disclosure.fileUrl,
      summary: disclosure.summary,
      structuralRisk: disclosure.structuralRisk,
      legalRisk: disclosure.legalRisk,
      financialRisk: disclosure.financialRisk,
      environmentalRisk: disclosure.environmentalRisk,
      overallRisk: disclosure.overallRisk,
      createdAt: disclosure.createdAt,
      updatedAt: disclosure.updatedAt,
    };
  }

  static fromEntities(disclosures: Disclosure[]): DisclosureResponseDto[] {
    return disclosures.map((disclosure) =>
      DisclosureResponseDto.fromEntity(disclosure),
    );
  }
}
