import { HttpStatus } from '@nestjs/common';
import { mockCreateUserReturnService } from '../../models/users/tests/mocks';
import { NestResponseBuilder } from '../../core/http/nestResponseBuilder';
import { Role } from '../../models/users/enums/role.enum';

export const mockToken = 'ifhdgboie8.fh3847ifvoijngo32in.32847oguniodfh';

export const mockLoginReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockToken)
  .build();

export const mockReceivedConfirmationAccountMailReturnService = {
  user: mockCreateUserReturnService,
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
  id: 'f7368e17-cea9-4787-8577-ad24619532b5',
  username: 'test',
  email: 'test@test.com',
  is_active: false,
  role: Role.ADMIN,
};

export const mockLoginReturn = {
  token: mockToken,
};

export const mockUser = {
  user: {
    id: 'f7368e17-cea9-4787-8577-ad24619532b5',
    username: 'test',
    email: 'test@test.com',
    role: Role.ADMIN,
    is_active: true,
  },
};
