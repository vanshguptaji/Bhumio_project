import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateDisclosureDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  fileUrl: string;
}

export class UpdateDisclosureDto {
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  summary?: string;
}
