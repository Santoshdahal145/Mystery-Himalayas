import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RentalProviderService } from './rental-provider.service';
import { CreateRentalProviderDto } from './dto/create-rental-provider-dto';
import { UpdateRentalProviderDto } from './dto/update-rental-provider-dto';

@Controller('rental-provider')
export class RentalProviderController {
  constructor(private readonly rentalProviderService: RentalProviderService) {}

  // -------------------------
  // CREATE RENTAL PROVIDER
  // -------------------------
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
  @Get()
  async getAllRentalProviders() {
    return this.rentalProviderService.getAll();
  }

  // -------------------------
  // GET RENTAL PROVIDER BY ID
  // -------------------------
  @Get(':id')
  async getRentalProviderById(@Param('id', ParseIntPipe) id: number) {
    return this.rentalProviderService.getRentalProviderById(id);
  }

  // -------------------------
  // DELETE RENTAL PROVIDER
  // -------------------------
  @Delete(':id')
  async deleteRentalProvider(@Param('id', ParseIntPipe) id: number) {
    await this.rentalProviderService.delete(id);
    return { message: 'Rental Provider deleted successfully' };
  }
}
