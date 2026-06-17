import { ApiProperty } from '@nestjs/swagger';
import { Property } from '../../../database/entities/property.entity';

export class PropertyResponseDto {
  @ApiProperty({ description: 'Property UUID' })
  id: string;

  @ApiProperty({ description: 'Street address' })
  address: string;

  @ApiProperty({ description: 'City' })
  city: string;

  @ApiProperty({ description: 'State' })
  state: string;

  @ApiProperty({ description: 'Zip code' })
  zipCode: string;

  @ApiProperty({ description: 'Date created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date last updated' })
  updatedAt: Date;

  static fromEntity(entity: Property): PropertyResponseDto {
    if (!entity) return null;
    const dto = new PropertyResponseDto();
    dto.id = entity.id;
    dto.address = entity.address;
    dto.city = entity.city;
    dto.state = entity.state;
    dto.zipCode = entity.zipCode;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  static fromEntities(entities: Property[]): PropertyResponseDto[] {
    return (entities || []).map(entity => this.fromEntity(entity));
  }
}
