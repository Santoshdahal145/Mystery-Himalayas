import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/pagination/pagination.util';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // -------------------------
  // CREATE USER
  // -------------------------
  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Email already registered.');
    }

    const hashedPassword: string = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
        role: 'USER',
      },
    });
  }

  // -------------------------
  // FIND BY EMAIL
  // -------------------------
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // -------------------------
  // FIND ALL USERS
  // -------------------------
  async getAllUsers(pagination: PaginationDto) {
    const page = Number(pagination.page) || 1;
    const limit = Number(pagination.limit) || 10;

    return paginate<User>(this.prisma.user, {
      page,
      limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  // -------------------------
  // FIND USER BY ID
  // -------------------------
  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  // -------------------------
  // UPDATE PROFILE (name, avatar)
  // -------------------------
  async updateProfile(userId: number, dto: UpdateProfileDto) {
    await this.ensureUserExists(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        avatar: dto.avatar,
      },
    });
  }

  // -------------------------
  // UPDATE PHONE NUMBER
  // -------------------------
  async updatePhone(userId: number, dto: UpdatePhoneDto) {
    await this.ensureUserExists(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        phoneNumber: dto.phoneNumber,
        countryCode: dto.countryCode,
      },
    });
  }

  // -------------------------
  // UPDATE PASSWORD
  // -------------------------
  async updatePassword(userId: number, dto: UpdatePasswordDto) {
    const user = await this.getUserById(userId);

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password does not match.');
    }

    const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);

    return this.prisma.user.update({
      where: { id: userId },
      data: { password: newHashedPassword },
    });
  }

  // -------------------------
  // UPDATE HASHED REFRESH TOKEN (FOR AUTH SERVICE)
  // -------------------------
  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    await this.ensureUserExists(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  // -------------------------
  // HELPER: CHECK USER EXISTS
  // -------------------------
  private async ensureUserExists(userId: number) {
    const exists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!exists) throw new NotFoundException('User not found');
  }
}
