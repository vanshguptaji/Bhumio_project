import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { OfferService } from './offer.service';
import { CreateOfferDto, OfferResponseDto } from './dto';

@ApiTags('Offers')
@Controller('api/v1/offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new offer via form input' })
  @ApiResponse({
    status: 201,
    description: 'Offer created successfully',
    type: OfferResponseDto,
  })
  async create(
    @Body() createDto: CreateOfferDto,
  ): Promise<OfferResponseDto> {
    return this.offerService.create(createDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'contract', maxCount: 1 },
      { name: 'loanApproval', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Submit an offer by uploading PDF contract and loan approval proof' })
  @ApiResponse({
    status: 201,
    description: 'Documents processed and offer scored successfully',
    type: OfferResponseDto,
  })
  async uploadOffer(
    @UploadedFiles()
    files: {
      contract?: any[];
      loanApproval?: any[];
    },
    @Body('propertyId') propertyId: string,
    @Body('buyerName') buyerName: string,
    @Body('buyerEmail') buyerEmail: string,
    @Body('offerPrice') offerPrice?: number,
    @Body('closingDays') closingDays?: number,
    @Body('inspectionContingency') inspectionContingency?: string,
    @Body('financingContingency') financingContingency?: string,
    @Body('appraisalContingency') appraisalContingency?: string,
    @Body('lenderName') lenderName?: string,
    @Body('loanAmount') loanAmount?: number,
    @Body('financingType') financingType?: string,
    @Body('loanApproved') loanApproved?: string,
    @Body('additionalConditions') additionalConditions?: string,
  ): Promise<OfferResponseDto> {
    // Convert string contingency inputs to boolean (since multipart form-data uploads everything as strings)
    const inspection = inspectionContingency === undefined ? undefined : inspectionContingency === 'true';
    const financing = financingContingency === undefined ? undefined : financingContingency === 'true';
    const appraisal = appraisalContingency === undefined ? undefined : appraisalContingency === 'true';
    const approved = loanApproved === undefined ? undefined : loanApproved === 'true';

    return this.offerService.processUploadedFiles(
      propertyId,
      buyerName,
      buyerEmail,
      files,
      {
        offerPrice: offerPrice ? Number(offerPrice) : undefined,
        closingDays: closingDays ? Number(closingDays) : undefined,
        inspectionContingency: inspection,
        financingContingency: financing,
        appraisalContingency: appraisal,
        lenderName,
        loanAmount: loanAmount ? Number(loanAmount) : undefined,
        financingType,
        loanApproved: approved,
        additionalConditions,
      } as any,
    );
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get all offers submitted for a property' })
  @ApiParam({ name: 'propertyId', description: 'Property ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'List of offers for property',
    type: [OfferResponseDto],
  })
  async findByProperty(
    @Param('propertyId') propertyId: string,
  ): Promise<OfferResponseDto[]> {
    return this.offerService.findByProperty(propertyId);
  }

  @Post(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept, Reject, or Counter an offer' })
  @ApiParam({ name: 'id', description: 'Offer ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Offer status updated successfully',
    type: OfferResponseDto,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<OfferResponseDto> {
    return this.offerService.updateStatus(id, status);
  }
}
