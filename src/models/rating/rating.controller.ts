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
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserRequestData } from '../../auth/auth.controller';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@ApiTags('Rating')
@UseGuards(RolesGuard)
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRatingDto: CreateRatingDto,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const rating = await this.ratingService.create(createRatingDto, user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/rating/${rating.id}`,
      })
      .setBody(rating)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<NestResponse> {
    const allRatings = await this.ratingService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allRatings)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    const rating = await this.ratingService.findOne(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(rating)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-ratings')
  async findMyRatings(
    @Req() { user }: IUserRequestData,
    @Query('businessId') businessId?: string,
  ): Promise<NestResponse> {
    const myRatings = await this.ratingService.findMyRatings(
      user.id,
      businessId,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(myRatings)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('business/:businessId')
  async findBusinessRatings(
    @Param('businessId') businessId: string,
  ): Promise<NestResponse> {
    const businessRatings = await this.ratingService.findRatingsByBusiness(
      businessId,
    );

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
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    const updatedRating = await this.ratingService.update(id, updateRatingDto);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({
        Location: `/rating/${updatedRating.id}`,
      })
      .setBody(updatedRating)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedRating = await this.ratingService.delete(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedRating)
      .build();

    return response;
  }
}
