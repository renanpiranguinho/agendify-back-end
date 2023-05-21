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
  UseInterceptors,
  UploadedFile,
  Res,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@ApiTags('Business')
@UseGuards(RolesGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './src/uploads/business' });
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads/business',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFile() image,
    @Body() createBusinessDto: CreateBusinessDto,
    @Req() { user }: IUserRequestData,
  ) {
    if (image) createBusinessDto.image_url = 'business/' + image.filename;;
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

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads/business',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/setImage/:id')
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() image,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const image_url = 'business/' + image.filename;
    await this.businessService.update(id, { image_url }, user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody({
        originalname: image.originalname,
        filename: image.filename,
        destination: image_url,
      })
      .build();

    return response;
  }
}
