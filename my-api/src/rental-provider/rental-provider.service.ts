import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRentalProviderDto } from './dto/create-rental-provider-dto';

@Injectable()
export class RentalProviderService {
  constructor(private readonly prisma: PrismaService) {}
  // -------------------------
  // CREATE AGENCY
  // -------------------------
  async create(dto: CreateRentalProviderDto) {
    const exists = await this.prisma.rentalProvider.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Email already registered.');
    }

    return this.prisma.rentalProvider.create({
      data: {
        email: dto.email,
        name: dto.name,
        address: {
          create: dto.address,
        },
        phone: dto.phone,
        logo: dto.logo,
        introduction: dto.introduction,
      },
    });
  }

  // -------------------------
  // GET ALL AGENCIES
  // -------------------------

  async getAll() {
    return await this.prisma.rentalProvider.findMany();
  }

  // -------------------------
  // GET AGENCY BY ID
  // -------------------------
  async getRentalProviderById(rentalProviderId: number) {
    const rentalProvider = await this.prisma.rentalProvider.findUnique({
      where: { id: rentalProviderId },
    });

    if (!rentalProvider)
      throw new NotFoundException('Rental Provider not found');
    return rentalProvider;
  }

  // -------------------------
  // DELETE AGENCY
  // -------------------------

  async delete(rentalProviderId: number) {
    await this.ensureAgencyExists(rentalProviderId);
  }

  // -------------------------
  // HELPER: CHECK AGENCY EXISTS
  // -------------------------

  private async ensureAgencyExists(rentalProviderId: number) {
    const exists = await this.prisma.rentalProvider.findUnique({
      where: { id: rentalProviderId },
    });
    if (!exists) throw new NotFoundException('Rental Provider not found');
  }
}
