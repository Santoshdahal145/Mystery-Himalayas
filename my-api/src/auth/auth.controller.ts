import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import type { IRequestUser } from './types/IRequestUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user.id, user.name, user.role);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: IRequestUser) {
    return this.authService.getMyProfile(req.user.id);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  async refresh(@Req() req: IRequestUser) {
    return this.authService.refresh(req.user.id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: IRequestUser) {
    await this.authService.logOut(req.user.id);
    return { message: 'Logged out successfully' };
  }
}
