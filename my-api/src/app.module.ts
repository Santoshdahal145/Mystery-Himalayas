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

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    AgencyModule,
  ],
  controllers: [AppController, AgencyController],
  providers: [AppService, PrismaService, AgencyService],
})
export class AppModule {}
