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
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { NestResponse } from '../../core/http/nestResponse';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserRequestData } from '../../auth/auth.controller';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@ApiTags('Scheduling')
@UseGuards(RolesGuard)
@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createSchedulingDto: CreateSchedulingDto,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const scheduling = await this.schedulingService.create(
      createSchedulingDto,
      user.id,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/scheduling/${createSchedulingDto.user_id}`,
      })
      .setBody(scheduling)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<NestResponse> {
    const allSchedules = await this.schedulingService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allSchedules)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    const schedule = await this.schedulingService.findOne(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(schedule)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-schedules')
  async findMySchedules(
    @Req() { user }: IUserRequestData,
    @Query()
    params: { service_id: string; start_datetime: Date; end_datetime: Date },
  ): Promise<NestResponse> {
    const mySchedules = await this.schedulingService.findMySchedules(
      user.id,
      params.service_id,
      params.start_datetime,
      params.end_datetime,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(mySchedules)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('business-schedules')
  async findBusinessSchedules(
    @Req() { user }: IUserRequestData,
    @Query()
    params: { business_id: string; day: string; month: string; year: string },
  ): Promise<NestResponse> {
    const businessSchedules =
      await this.schedulingService.findSchedulesByBusiness(
        user.id,
        params.business_id,
        params.day,
        params.month,
        params.year,
      );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(businessSchedules)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateSchedulingDto,
  ) {
    const updatedSchedule = await this.schedulingService.update(
      id,
      updateScheduleDto,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({
        Location: `/scheduling/${updatedSchedule.id}`,
      })
      .setBody(updatedSchedule)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedSchedule = await this.schedulingService.delete(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(deletedSchedule)
      .build();

    return response;
  }
}
