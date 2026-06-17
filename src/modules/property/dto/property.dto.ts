import { IsString, IsUUID, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(5, 255)
  address: string;

  @IsString()
  @Length(2, 100)
  city: string;

  @IsString()
  @Length(2, 50)
  state: string;

  @IsString()
  @Length(5, 10)
  zipCode: string;
}

export class UpdatePropertyDto {
  @IsString()
  @Length(5, 255)
  address?: string;

  @IsString()
  @Length(2, 100)
  city?: string;

  @IsString()
  @Length(2, 50)
  state?: string;

  @IsString()
  @Length(5, 10)
  zipCode?: string;
}
