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
import { Role } from '../users/enums/role.enum';

@Injectable()
export class BusinessService {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly usersRepository: UsersRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async create(
    {
      address,
      category_id,
      description,
      image_url,
      name,
      telephone,
    }: CreateBusinessDto,
    owner_id: string,
  ) {
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
      owner_id: owner_id,
      telephone,
    });

    if (owner.role === Role.USER) {
      await this.prismaService.user.update({
        where: { id: owner_id },
        data: { role: Role.PROVIDER },
      });
    }

    return new Business(newBusiness);
  }

  async findAll(
    businessName?: string,
    categoryId?: string,
  ): Promise<Business[]> {
    const allBusiness = await this.businessRepository.findAll(
      businessName,
      categoryId,
    );

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
      telephone,
    }: UpdateBusinessDto,
    owner_id: string,
  ): Promise<Business> {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const ownerExists = await this.usersRepository.findById(owner_id);

    if (!ownerExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      owner_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == business.id,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
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

    const updatedBusiness = await this.businessRepository.updateById(id, {
      address,
      category_id,
      description,
      image_url,
      name,
      telephone,
    });

    return new Business(updatedBusiness);
  }

  async remove(id: string, owner_id: string) {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const ownerExists = await this.usersRepository.findById(owner_id);

    if (!ownerExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      owner_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == business.id,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
      });
    }

    const businessDeleted = await this.businessRepository.softDelete(id);

    if (!businessDeleted)
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not deleted',
      });

    return new Business(businessDeleted);
  }
}
