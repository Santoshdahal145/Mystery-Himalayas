import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRentalProviderDto } from './dto/create-rental-provider-dto';
import { UpdateRentalProviderDto } from './dto/update-rental-provider-dto';
import { Prisma, RentalProvider } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/pagination/pagination.util';

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

    const newRentalProvider = await this.prisma.rentalProvider.create({
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
    console.log(
      '🚀 ~ RentalProviderService ~ create ~ newRentalProvider:',
      newRentalProvider,
    );
    return newRentalProvider;
  }

  // -------------------------
  // UPDATE AGENCY
  // -------------------------
  async update(rentalProviderId: number, dto: UpdateRentalProviderDto) {
    const rentalProvider = await this.prisma.rentalProvider.findUnique({
      where: { id: rentalProviderId },
      include: { address: true },
    });

    if (!rentalProvider)
      throw new NotFoundException('Rental Provider not found');

    let addressData:
      | Prisma.AddressUpdateOneWithoutAgencyNestedInput
      | undefined = undefined;

    if (dto.address) {
      addressData = { update: dto.address };
    }

    return this.prisma.agency.update({
      where: { id: rentalProviderId },
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        logo: dto.logo,
        introduction: dto.introduction,
        address: addressData,
      },
    });
  }

  // -------------------------
  // GET ALL AGENCIES
  // -------------------------

  async getAll(_pagination: PaginationDto) {
    const page = Number(_pagination.page) || 1;
    const limit = Number(_pagination.limit) || 10;

    const { data, pagination } = await paginate<RentalProvider>(
      this.prisma.rentalProvider,
      {
        page,
        limit,
        orderBy: { createdAt: 'desc' },
      },
    );
    console.log(data, pagination);
    return {
      rentalProviders: data,
      pagination,
    };
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

    await this.prisma.$transaction(async (tx) => {
      await tx.address.deleteMany({
        where: { agencyId: rentalProviderId },
      });

      await tx.rentalProvider.delete({
        where: { id: rentalProviderId },
      });
    });

    return {
      message: 'Rental Provider deleted successfully',
    };
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
