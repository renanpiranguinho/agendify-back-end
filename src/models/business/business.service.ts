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
import { PrismaService } from '../../../prisma/prisma.service';
import { UsersRepository } from '../users/repository/user.repository';
import { Role } from '../users/enums/role.enum';
import { AddressRepository } from '../address/repository/address.repository';
import { Address } from '../address/entities/address.entity';
import { RatingRepository } from '../rating/repository/rating.repository';

@Injectable()
export class BusinessService {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
    private readonly prismaService: PrismaService,
    private readonly ratingRepository: RatingRepository,
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
    let newAddress: Address;
    if (address) {
      newAddress = await this.addressRepository.create({
        city: address.city,
        district: address.district,
        postal_code: address.postal_code,
        number: address.number,
        state: address.state,
        street: address.street,
        owner_id: owner_id,
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
    const owner = await this.usersRepository.findById(owner_id);
    if (!owner) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const newBusiness = await this.businessRepository.create({
      name,
      description,
      address: address ? newAddress : null,
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

    const allBusinessWithRating = allBusiness.map(async (business) => {
      const rating = await this.ratingRepository.findAverageRatingByBusiness(
        business.id,
      );

      return { ...business, rating };
    });

    const businessArray = await Promise.all(allBusinessWithRating);

    return businessArray.map((business) => new Business(business));
  }

  async findById(id: string): Promise<Business> {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const businessRating =
      await this.ratingRepository.findAverageRatingByBusiness(business.id);

    return new Business({ ...business, rating: businessRating });
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

    const allBusinessWithRating = business.map(async (business) => {
      const rating = await this.ratingRepository.findAverageRatingByBusiness(
        business.id,
      );

      return { ...business, rating };
    });

    const businessArray = await Promise.all(allBusinessWithRating);

    return businessArray.map((business) => new Business(business));
  }

  async update(
    id: string,
    { category_id, description, name, telephone }: UpdateBusinessDto,
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
        message: 'Business does not belong to user',
      });
    }

    const category = this.prismaService.category.findFirst({
      where: { id: category_id },
    });

    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Category is not found',
      });
    }

    const updatedBusiness = await this.businessRepository.updateById(id, {
      category_id,
      description,
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
        message: 'Business is not found',
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
        message: 'Business does not belong to user',
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

  async getCategories() {
    const allCategories = await this.prismaService.category.findMany();

    return allCategories;
  }
}
