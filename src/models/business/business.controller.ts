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
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { NestResponse } from '../../core/http/nestResponse';
import { IUserRequestData } from '../../auth/auth.controller';

@ApiTags('Business')
@UseGuards(RolesGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(@Body() createBusinessDto: CreateBusinessDto) {
    const newBusiness = await this.businessService.create(createBusinessDto);
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/business/${newBusiness.id}` })
      .setBody(newBusiness)
      .build();

    return response;
  }

  @Roles(Role.ADMIN, Role.PROVIDER)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<NestResponse> {
    const allBusiness = await this.businessService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allBusiness)
      .build();

    return response;
  }

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
  @Roles(Role.ADMIN, Role.PROVIDER)
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
  ): Promise<NestResponse> {
    const updatedBusiness = await this.businessService.update(id, updateBusinessDto);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/business/${updatedBusiness.id}` })
      .setBody(updatedBusiness)
      .build();

    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
