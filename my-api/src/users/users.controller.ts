import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create user (Admin or via Signup)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.userService.getAllUsers(pagination);
  }

  // Get single user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  // Update phone number
  @Patch(':id/phone')
  updatePhone(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return this.userService.updatePhone(Number(id), updatePhoneDto);
  }

  // Update profile fields (name, avatar, country)
  @Patch(':id/profile')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(Number(id), updateProfileDto);
  }
}
