import { HttpStatus } from "@nestjs/common";
import { NestResponseBuilder } from "../../../core/http/nestResponseBuilder";
import { Role } from "../../users/enums/role.enum";
import { mockedUserId } from "../../users/tests/mocks";
import { CreateAdressDto } from "../dto/create-address.dto";
import { Address } from "../entities/address.entity";
import { UpdateAddressDto } from "../dto/update-address.dto";

export const mockedAddressId = '307171f1-7eef-449c-808c-a70f54b96139';

export const mockUser = {
  user: {
    id: mockedUserId,
    name: 'test',
    email: 'test@test.com',
    role: Role.USER,
    is_active: true,
  },
};

export const mockCreateAddressInput: CreateAdressDto = {
  city: 'Test-city',
  district: 'Test-district',
  number: '123',
  postal_code: '12345678',
  state: 'Test-state',
  street: 'Test-street'
}

export const mockCreateAddressReturnService: Address= {
  id: mockedAddressId,
  ...mockCreateAddressInput,
  created_at: new Date(),
  updated_at: new Date(),
}

export const mockUpdateAddressInput: UpdateAddressDto = {
  city: "New-test-city",
  street: "New-test-street"
};

export const mockUpdateAddressReturnService: Address = {
  ...mockCreateAddressReturnService,
  ...mockUpdateAddressInput,
};

export const mockRemoveAddressReturnService: Address = {
  ...mockCreateAddressReturnService,
};

export const mockCreateAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({
    Location: `/address/${mockedAddressId}`,
  })
  .setBody(mockCreateAddressReturnService)
  .build();

  export const mockFindAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateAddressReturnService])
  .build();

  export const mockFindOneAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateAddressReturnService)
  .build();

  export const mockUpdateAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setHeaders({ Location: `/address/${mockedAddressId}` })
  .setBody(mockUpdateAddressReturnService)
  .build();

  export const mockRemoveAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateAddressReturnService)
  .build();