import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PropertyService } from './property.service';
import { CreatePropertyDto, PropertyResponseDto } from './dto';

@ApiTags('Properties')
@Controller()
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('api/v1/properties')
  @Post('property')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({
    status: 201,
    description: 'Property created successfully',
    type: PropertyResponseDto,
  })
  async create(
    @Body() createDto: CreatePropertyDto,
  ): Promise<PropertyResponseDto> {
    return this.propertyService.create(createDto);
  }

  @Get('api/v1/properties')
  @Get('property')
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({
    status: 200,
    description: 'List of all properties',
    type: [PropertyResponseDto],
  })
  async findAll(): Promise<PropertyResponseDto[]> {
    return this.propertyService.findAll();
  }

  @Get('api/v1/properties/:id')
  @Get('property/:id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiParam({ name: 'id', description: 'Property ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Property found',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async findById(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.propertyService.findById(id);
  }

  @Get(':id/dashboard')
  @ApiOperation({ summary: 'Get aggregated property intelligence dashboard data' })
  @ApiParam({ name: 'id', description: 'Property ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Property disclosures and ranked offers loaded successfully',
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async getDashboardData(@Param('id') id: string): Promise<any> {
    return this.propertyService.getDashboardData(id);
  }
}
