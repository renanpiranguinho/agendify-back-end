import { HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from '../../../core/http/nestResponseBuilder';
import { Role } from '../enums/role.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export const mockCreateUserInput: CreateUserDto = {
  name: 'test',
  email: 'test@test.com',
  password: '123456',
};

export const mockCreateUserReturnService: User = {
  id: 'f7368e17-cea9-4787-8577-ad24619532b5',
  email: 'test@test.com',
  name: 'test',
  password: '123456',
  is_active: false,
  role: Role.USER,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const mockCreateUserReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({ Location: `/users/${mockCreateUserReturnService.id}` })
  .setBody(mockCreateUserReturnService)
  .build();

export const mockFindOneUserReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateUserReturnService)
  .build();

export const mockFindAllUserReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateUserReturnService])
  .build();

export const mockUpdateUserInput: UpdateUserDto = {
  name: 'test',
  email: 'test1@test.com',
};

export const mockUpdateUserReturnService: User = {
  ...mockCreateUserReturnService,
  ...mockUpdateUserInput,
};

export const mockUpdateUserReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setHeaders({ Location: `/users/${mockUpdateUserReturnService.id}` })
  .setBody(mockUpdateUserReturnService)
  .build();

export const mockRemoveUserReturnService: User = {
  ...mockCreateUserReturnService,
  deleted_at: new Date(),
};

export const mockRemoveUserReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockRemoveUserReturnService)
  .build();
