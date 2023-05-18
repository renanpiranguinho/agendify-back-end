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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { NestResponse } from '../../core/http/nestResponse';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const newService = await this.serviceService.create(createServiceDto);
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/business/${newService.id}` })
      .setBody(newService)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<NestResponse> {
    const allServices = await this.serviceService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allServices)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NestResponse> {
    const serviceFound = await this.serviceService.findById(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(serviceFound)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateServiceDto,
  ): Promise<NestResponse> {
    const updatedBusiness = await this.serviceService.update(
      id,
      updateBusinessDto,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/business/${updatedBusiness.id}` })
      .setBody(updatedBusiness)
      .build();

    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedService = await this.serviceService.remove(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedService)
      .build();

    return response;
  }
}
