import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAgencyDto } from './dto/create-agency-dto';
import { Prisma } from '@prisma/client';
import { UpdateAgencyDto } from './dto/update-agency-dto';

@Injectable()
export class AgencyService {
  constructor(private readonly prisma: PrismaService) {}
  // -------------------------
  // CREATE AGENCY
  // -------------------------
  async create(dto: CreateAgencyDto) {
    const exists = await this.prisma.agency.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Email already registered.');
    }

    return this.prisma.agency.create({
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
  // UPDATE AGENCY
  // -------------------------
  async update(agencyId: number, dto: UpdateAgencyDto) {
    const agency = await this.prisma.agency.findUnique({
      where: { id: agencyId },
      include: { address: true },
    });

    if (!agency) throw new NotFoundException('Agency not found');

    let addressData:
      | Prisma.AddressUpdateOneWithoutAgencyNestedInput
      | undefined = undefined;

    if (dto.address) {
      addressData = { update: dto.address };
    }

    return this.prisma.agency.update({
      where: { id: agencyId },
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

  async getAll() {
    return await this.prisma.agency.findMany();
  }

  // -------------------------
  // GET AGENCY BY ID
  // -------------------------
  async getAgencyById(agencyId: number) {
    const agency = await this.prisma.agency.findUnique({
      where: { id: agencyId },
    });

    if (!agency) throw new NotFoundException('Agency not found');
    return agency;
  }

  // -------------------------
  // DELETE AGENCY
  // -------------------------

  async delete(agencyId: number) {
    await this.ensureAgencyExists(agencyId);
  }

  // -------------------------
  // HELPER: CHECK AGENCY EXISTS
  // -------------------------

  private async ensureAgencyExists(agencyId: number) {
    const exists = await this.prisma.agency.findUnique({
      where: { id: agencyId },
    });
    if (!exists) throw new NotFoundException('Agency not found');
  }
}
