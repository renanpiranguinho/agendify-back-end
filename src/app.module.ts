import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { NestResponseInterceptor } from './core/http/nestResponse.interceptor';
import { HttpExceptionFilter } from './common/filters/httpException.filter';

import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from './models/users/users.module';
import { SendMailModule } from './mail/send-mail.module';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './models/business/business.module';
import { ServicesModule } from './models/service/services.module';
import { AddressModule } from './models/address/address.module';
import { RatingModule } from './models/rating/rating.module';
import { AvailabilityModule } from './models/availability/availability.module';
import { SchedulingModule } from './models/scheduling/scheduling.module';

@Module({
  imports: [
    UsersModule,
    AddressModule,
    AuthModule,
    SendMailModule,
    BusinessModule,
    ServicesModule,
    RatingModule,
    AvailabilityModule,
    SchedulingModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NestResponseInterceptor,
    },
  ]
})
export class AppModule {}
