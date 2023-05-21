import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { SendMailService } from '../../mail/send-mail.service';
import { EncryptData } from '../../utils/encrypt-data';
import { AuthService } from '../auth.service';
import { mockCreateUserReturnService } from '../../models/users/tests/mocks';
import {
  mockAuthenticateInput,
  mockLoginInput,
  mockLoginReturn,
  mockToken,
} from './mocks';
import { GenerateToken } from '../../providers/generate-token';
import { UsersRepository } from '../../models/users/repository/user.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let sendMailService: SendMailService;
  let encryptData: EncryptData;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(mockToken),
          },
        },
        {
          provide: SendMailService,
          useValue: {},
        },
        {
          provide: EncryptData,
          useValue: {
            decrypt: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: GenerateToken,
          useValue: {
            generate: jest.fn().mockReturnValue(mockToken),
          },
        },

        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findById: jest.fn().mockReturnValue(mockCreateUserReturnService),
            updateById: jest.fn().mockReturnValue(mockCreateUserReturnService),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    sendMailService = module.get<SendMailService>(SendMailService);
    encryptData = module.get<EncryptData>(EncryptData);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(sendMailService).toBeDefined();
    expect(encryptData).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Authenticate', () => {
    it('should be authenticate return successfully value', async () => {
      const response = await authService.authenticate(mockAuthenticateInput);

      expect(response).toEqual(mockCreateUserReturnService);
    });

    it('should be authenticate throw error invalid email', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockResolvedValueOnce(undefined);

      const response = await authService.authenticate(mockAuthenticateInput);

      expect(response).toEqual(false);
    });

    it('should be authenticate throw error invalid password', async () => {
      jest.spyOn(encryptData, 'decrypt').mockResolvedValueOnce(false);

      const response = await authService.authenticate(mockAuthenticateInput);

      expect(response).toEqual(false);
    });
  });

  describe('Login', () => {
    it('should be login return successfully value', async () => {
      const response = await authService.login(mockLoginInput);

      expect(response).toEqual(mockLoginReturn);
    });
  });
});
