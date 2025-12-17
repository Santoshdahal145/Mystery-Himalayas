import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RentalProviderService } from './rental-provider.service';
import { CreateRentalProviderDto } from './dto/create-rental-provider-dto';
import { UpdateRentalProviderDto } from './dto/update-rental-provider-dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('rental-provider')
export class RentalProviderController {
  constructor(private readonly rentalProviderService: RentalProviderService) {}

  // -------------------------
  // CREATE RENTAL PROVIDER
  // -------------------------
  @Public()
  @Post()
  async createRentalProvider(@Body() dto: CreateRentalProviderDto) {
    return this.rentalProviderService.create(dto);
  }
  // -------------------------
  // UPDATE RENTAL PROVIDER
  // -------------------------
  @Put(':id')
  async updateRentalProvider(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRentalProviderDto,
  ) {
    return this.rentalProviderService.update(id, dto);
  }

  // -------------------------
  // GET ALL RENTAL PROVIDERS
  // -------------------------
  @Public()
  @Get()
  async getAllRentalProviders(@Query() pagination: PaginationDto) {
    return this.rentalProviderService.getAll(pagination);
  }

  // -------------------------
  // GET RENTAL PROVIDER BY ID
  // -------------------------
  @Public()
  @Get(':id')
  async getRentalProviderById(@Param('id', ParseIntPipe) id: number) {
    return this.rentalProviderService.getRentalProviderById(id);
  }

  // -------------------------
  // DELETE RENTAL PROVIDER
  // -------------------------
  @Public()
  @Delete(':id')
  async deleteRentalProvider(@Param('id', ParseIntPipe) id: number) {
    await this.rentalProviderService.delete(id);
    return { message: 'Rental Provider deleted successfully' };
  }
}
