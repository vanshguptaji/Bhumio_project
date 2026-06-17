import { IsString, IsNotEmpty, IsEmail, IsNumber, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ description: 'Property UUID the offer is for', example: 'uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty({ description: 'Name of the buyer', example: 'Sarah Connor' })
  @IsString()
  @IsNotEmpty()
  buyerName: string;

  @ApiProperty({ description: 'Email address of the buyer', example: 'sarah@skynet.com' })
  @IsEmail()
  @IsNotEmpty()
  buyerEmail: string;

  @ApiProperty({ description: 'Numeric offer price in USD', example: 550000 })
  @IsNumber()
  @IsNotEmpty()
  offerPrice: number;

  @ApiProperty({ description: 'Number of days to close the transaction', example: 30 })
  @IsNumber()
  @IsNotEmpty()
  closingDays: number;

  @ApiProperty({ description: 'Whether offer includes inspection contingency', example: true })
  @IsBoolean()
  @IsOptional()
  inspectionContingency?: boolean;

  @ApiProperty({ description: 'Whether offer includes financing contingency', example: true })
  @IsBoolean()
  @IsOptional()
  financingContingency?: boolean;

  @ApiProperty({ description: 'Whether offer includes appraisal contingency', example: true })
  @IsBoolean()
  @IsOptional()
  appraisalContingency?: boolean;

  @ApiProperty({ description: 'Any additional notes or conditions', example: 'Seller credit requested' })
  @IsString()
  @IsOptional()
  additionalConditions?: string;

  // Fields for Loan Details (nested or flat for simplicity)
  @ApiProperty({ description: 'Lender name', example: 'Chase Mortgage' })
  @IsString()
  @IsOptional()
  lenderName?: string;

  @ApiProperty({ description: 'Loan amount', example: 400000 })
  @IsNumber()
  @IsOptional()
  loanAmount?: number;

  @ApiProperty({ description: 'Financing type', example: 'Conventional' })
  @IsString()
  @IsOptional()
  financingType?: string;

  @ApiProperty({ description: 'Is loan approved', example: true })
  @IsBoolean()
  @IsOptional()
  loanApproved?: boolean;
}
