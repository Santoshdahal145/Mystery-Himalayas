import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency-dto';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  // -------------------------
  // CREATE AGENCY
  // -------------------------
  @Post()
  async createAgency(@Body() dto: CreateAgencyDto) {
    return this.agencyService.create(dto);
  }

  // -------------------------
  // GET ALL AGENCIES
  // -------------------------
  @Get()
  async getAllAgencies() {
    return this.agencyService.getAll();
  }

  // -------------------------
  // GET AGENCY BY ID
  // -------------------------
  @Get(':id')
  async getAgencyById(@Param('id', ParseIntPipe) id: number) {
    return this.agencyService.getAgencyById(id);
  }

  // -------------------------
  // DELETE AGENCY
  // -------------------------
  @Delete(':id')
  async deleteAgency(@Param('id', ParseIntPipe) id: number) {
    await this.agencyService.delete(id);
    return { message: 'Agency deleted successfully' };
  }
}
