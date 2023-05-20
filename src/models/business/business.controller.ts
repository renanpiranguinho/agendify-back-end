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
  Query,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { NestResponse } from '../../core/http/nestResponse';
import { IUserRequestData } from '../../auth/auth.controller';

@ApiTags('Business')
@UseGuards(RolesGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBusinessDto: CreateBusinessDto,
    @Req() { user }: IUserRequestData,
  ) {
    const newBusiness = await this.businessService.create(
      createBusinessDto,
      user.id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/business/${newBusiness.id}` })
      .setBody(newBusiness)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() params: { business_name?: string; category_id?: string },
  ): Promise<NestResponse> {
    const allBusiness = await this.businessService.findAll(
      params.business_name,
      params.category_id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allBusiness)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/my-business')
  async findMe(@Req() { user }: IUserRequestData): Promise<NestResponse> {
    const businessFound = await this.businessService.findByOwner(user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(businessFound)
      .build();
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NestResponse> {
    const businessFound = await this.businessService.findById(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(businessFound)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const updatedBusiness = await this.businessService.update(
      id,
      updateBusinessDto,
      user.id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/business/${updatedBusiness.id}` })
      .setBody(updatedBusiness)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() { user }: IUserRequestData) {
    return this.businessService.remove(id, user.id);
  }
}
