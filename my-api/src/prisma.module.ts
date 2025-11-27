import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optional, makes PrismaService available everywhere without imports
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
