import { ApiProperty } from '@nestjs/swagger';
import { Offer } from '../../../database/entities/offer.entity';

export class OfferResponseDto {
  @ApiProperty({ description: 'Offer UUID' })
  id: string;

  @ApiProperty({ description: 'Property UUID' })
  propertyId: string;

  @ApiProperty({ description: 'Buyer name' })
  buyerName: string;

  @ApiProperty({ description: 'Buyer email' })
  buyerEmail: string;

  @ApiProperty({ description: 'Offer price' })
  offerPrice: number;

  @ApiProperty({ description: 'Closing timeline in days' })
  closingDays: number;

  @ApiProperty({ description: 'Inspection contingency flag' })
  inspectionContingency: boolean;

  @ApiProperty({ description: 'Financing contingency flag' })
  financingContingency: boolean;

  @ApiProperty({ description: 'Appraisal contingency flag' })
  appraisalContingency: boolean;

  @ApiProperty({ description: 'Additional conditions text' })
  additionalConditions: string;

  @ApiProperty({ description: 'AI-generated strength score (0-100)' })
  strengthScore: number;

  @ApiProperty({ description: 'AI-generated closing probability (0-100)' })
  closingProbability: number;

  @ApiProperty({ description: 'AI closing risk level (LOW, MEDIUM, HIGH)' })
  riskLevel: string;

  @ApiProperty({ description: 'AI natural language explanation' })
  explanation: string;

  @ApiProperty({ description: 'Extracted data JSON' })
  extractedData: any;

  @ApiProperty({ description: 'Loan documents associated with offer' })
  loanDocuments: any[];

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  static fromEntity(entity: Offer): OfferResponseDto {
    if (!entity) return null;
    const dto = new OfferResponseDto();
    dto.id = entity.id;
    dto.propertyId = entity.propertyId;
    dto.buyerName = entity.buyerName;
    dto.buyerEmail = entity.buyerEmail;
    dto.offerPrice = Number(entity.offerPrice);
    dto.closingDays = entity.closingDays;
    dto.inspectionContingency = entity.inspectionContingency;
    dto.financingContingency = entity.financingContingency;
    dto.appraisalContingency = entity.appraisalContingency;
    dto.additionalConditions = entity.additionalConditions;
    dto.strengthScore = Number(entity.strengthScore || 0);
    dto.closingProbability = Number(entity.closingProbability || 0);
    dto.riskLevel = entity.riskLevel;
    dto.explanation = entity.explanation;
    dto.extractedData = entity.extractedData;
    dto.loanDocuments = entity.loanDocuments || [];
    dto.createdAt = entity.createdAt;
    return dto;
  }

  static fromEntities(entities: Offer[]): OfferResponseDto[] {
    return (entities || []).map(entity => this.fromEntity(entity));
  }
}
