import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { AgencyController } from './agency/agency.controller';
import { AgencyService } from './agency/agency.service';
import { AgencyModule } from './agency/agency.module';
import { RentalProviderController } from './rental-provider/rental-provider.controller';
import { RentalProviderService } from './rental-provider/rental-provider.service';
import { RentalProviderModule } from './rental-provider/rental-provider.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    AgencyModule,
    RentalProviderModule,
  ],
  controllers: [AppController, AgencyController, RentalProviderController],
  providers: [AppService, PrismaService, AgencyService, RentalProviderService],
})
export class AppModule {}
