import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserRequestData } from '../../auth/auth.controller';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { AvailabilityService } from './availability.service';
import { getStringFromDateTime } from 'src/utils/format-data';

@ApiTags('Availability')
@UseGuards(RolesGuard)
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const availability = await this.availabilityService.create(
      createAvailabilityDto,
      user.id,
    );
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/availability/business/${createAvailabilityDto.business_id}`,
      })
      .setBody(availability)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<NestResponse> {
    const allAvailabilities = await this.availabilityService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allAvailabilities)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    const availability = await this.availabilityService.findOne(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(availability)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('business/:businessId')
  async findBusinessRatings(
    @Param('businessId') businessId: string,
  ): Promise<NestResponse> {
    const businessRatings =
      await this.availabilityService.findAvailabilityByBusiness(businessId);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(businessRatings)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Req() { user }: IUserRequestData,
  ) {
    const updatedAvailability = await this.availabilityService.update(
      id,
      updateAvailabilityDto,
      user.id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({
        Location: `/availability/${updatedAvailability.id}`,
      })
      .setBody(updatedAvailability)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('business/:id')
  async updateByBusiness(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Req() { user }: IUserRequestData,
  ) {
    const updatedAvailability = await this.availabilityService.updateByBusiness(
      id,
      updateAvailabilityDto,
      user.id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({
        Location: `/availability/business/${id}`,
      })
      .setBody(updatedAvailability)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() { user }: IUserRequestData) {
    const deletedAvailability = await this.availabilityService.delete(
      id,
      user.id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedAvailability)
      .build();

    return response;
  }
}
