import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessRepository } from './repository/business.repository';
import { Business } from './entities/business.entity';
import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from '../users/repository/user.repository';

@Injectable()
export class BusinessService {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly usersRepository: UsersRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async create({
    address,
    category_id,
    description,
    image_url,
    name,
    owner_id,
    telephone,
  }: CreateBusinessDto) {
    //###############################
    // Create address
    const newAddress = address;
    //###############################

    const category = this.prismaService.category.findFirst({
      where: { id: category_id },
    });

    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Category not found',
      });
    }
    const owner = await this.usersRepository.findById(owner_id);
    if (!owner) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const oldBusiness = await this.businessRepository.findByTel(telephone);

    if (oldBusiness)
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Telephone already in use',
      });

    const newBusiness = await this.businessRepository.create({
      name,
      description,
      address: newAddress,
      image_url,
      category_id,
      owner_id,
      telephone,
    });

    return new Business(newBusiness);
  }

  async findAll(): Promise<Business[]> {
    const allBusiness = await this.businessRepository.findAll();

    return allBusiness.map((business) => new Business(business));
  }

  async findById(id: string): Promise<Business> {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    return new Business(business);
  }

  async findByOwner(owner_id: string) {
    const ownerExists = await this.usersRepository.findById(owner_id);
    if (!ownerExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const business = await this.businessRepository.findByOwner(owner_id);
    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Logged user does not have business',
      });
    }

    return business.map((b) => new Business(b));
  }

  async update(
    id: string,
    {
      address,
      category_id,
      description,
      image_url,
      name,
      owner_id,
      telephone,
    }: UpdateBusinessDto,
  ): Promise<Business> {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const category = this.prismaService.category.findFirst({
      where: { id: category_id },
    });

    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Category not found',
      });
    }

    const updatedUser = await this.businessRepository.updateById(id, {
      address,
      category_id,
      description,
      image_url,
      name,
      owner_id,
      telephone,
    });

    return new Business(updatedUser);
  }

  remove(id: string) {
    return `This action removes a #${id} business`;
  }
}
