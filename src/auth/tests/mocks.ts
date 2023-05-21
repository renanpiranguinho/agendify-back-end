import { HttpStatus } from '@nestjs/common';
import {
  mockCreateUserReturnService,
  mockedUserId,
} from '../../models/users/tests/mocks';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { Role } from '../../models/users/enums/role.enum';

export const mockToken = 'ifhdgboie8.fh3847ifvoijngo32in.32847oguniodfh';

export const mockLoginReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockToken)
  .build();

const mockCreateUserReturnServiceActive = {
  ...mockCreateUserReturnService,
  is_active: true,
};

export const mockReceivedConfirmationAccountMailReturnService = {
  user: mockCreateUserReturnServiceActive,
  message: 'Email has confirmed',
};

export const mockReceivedConfirmationAccountMailReturnController =
  new NestResponseBuilder()
    .setStatus(HttpStatus.OK)
    .setHeaders({
      Location: `/users/${mockReceivedConfirmationAccountMailReturnService.user.id}`,
    })
    .setBody(mockReceivedConfirmationAccountMailReturnService)
    .build();

export const mockAuthenticateInput = {
  login: 'test@test.com',
  password: '123456',
};

export const mockLoginInput = {
  id: mockedUserId,
  name: 'test',
  email: 'test@test.com',
  is_active: false,
  role: Role.USER,
};

export const mockLoginReturn = {
  token: mockToken,
};

export const mockUser = {
  user: {
    id: mockedUserId,
    name: 'test',
    email: 'test@test.com',
    role: Role.USER,
    is_active: true,
  },
};
