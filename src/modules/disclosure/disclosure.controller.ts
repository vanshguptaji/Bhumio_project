import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DisclosureService } from './disclosure.service';
import {
  CreateDisclosureDto,
  UpdateDisclosureDto,
  DisclosureResponseDto,
} from './dto';

@ApiTags('Disclosures')
@Controller('api/v1/disclosures')
export class DisclosureController {
  constructor(private readonly disclosureService: DisclosureService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new disclosure' })
  @ApiResponse({
    status: 201,
    description: 'Disclosure created successfully',
    type: DisclosureResponseDto,
  })
  async create(
    @Body() createDto: CreateDisclosureDto,
  ): Promise<DisclosureResponseDto> {
    return this.disclosureService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all disclosures' })
  @ApiResponse({
    status: 200,
    description: 'List of all disclosures',
    type: [DisclosureResponseDto],
  })
  async findAll(): Promise<DisclosureResponseDto[]> {
    return this.disclosureService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get disclosure by ID' })
  @ApiParam({ name: 'id', description: 'Disclosure ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Disclosure found',
    type: DisclosureResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Disclosure not found' })
  async findById(@Param('id') id: string): Promise<DisclosureResponseDto> {
    return this.disclosureService.findById(id);
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get all disclosures for a property' })
  @ApiParam({ name: 'propertyId', description: 'Property ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'List of disclosures for property',
    type: [DisclosureResponseDto],
  })
  async findByPropertyId(
    @Param('propertyId') propertyId: string,
  ): Promise<DisclosureResponseDto[]> {
    return this.disclosureService.findByPropertyId(propertyId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update disclosure' })
  @ApiParam({ name: 'id', description: 'Disclosure ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Disclosure updated successfully',
    type: DisclosureResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Disclosure not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDisclosureDto,
  ): Promise<DisclosureResponseDto> {
    return this.disclosureService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete disclosure' })
  @ApiParam({ name: 'id', description: 'Disclosure ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Disclosure deleted successfully' })
  @ApiResponse({ status: 404, description: 'Disclosure not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.disclosureService.delete(id);
  }
}
