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
import { AddressService } from './address.service';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserRequestData } from '../../auth/auth.controller';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateAdressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@UseGuards(RolesGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAddressDto: CreateAdressDto,
    @Req() { user }: IUserRequestData
  ): Promise<NestResponse> {
    const newAddress = await this.addressService.create(createAddressDto, user.id);
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/address/${newAddress.id}` })
      .setBody(newAddress)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findMe(@Req() { user }: IUserRequestData,): Promise<NestResponse> {
    const userFound = await this.addressService.findMine(user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(userFound)
      .build();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NestResponse> {
    const addressFound = await this.addressService.findById(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(addressFound)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<NestResponse> {
    const updatedAddress = await this.addressService.update(id, updateAddressDto);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/address/${updatedAddress.id}` })
      .setBody(updatedAddress)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<NestResponse> {
    const deletedUser = await this.addressService.remove(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedUser)
      .build();

    return response;
  }
}
