import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthJWTPayload } from './types/auth.jwtPayload';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import refreshConfig from 'src/config/refresh.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,

    @Inject(refreshConfig.KEY)
    private refreshTokenConfiguration: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const existedUser = await this.userService.getUserByEmail(
      createUserDto.email,
    );
    if (existedUser) throw new ConflictException('User already exists!');
    return this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Credentials!');
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      role: user.role,
    };
  }

  async login(userId: number, name?: string, role?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      name,
      role,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJWTPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfiguration),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    return { id: user.id, role: user.role };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    if (!user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isRefreshTokenMatched = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token');

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
    };
  }

  async getMyProfile(userId: number) {
    return await this.userService.getUserById(userId);
  }

  async refresh(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async logOut(userId: number) {
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}
