import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DisclosureAnalysisDto {
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

  @IsOptional()
  extractedData?: Record<string, any>;
}
