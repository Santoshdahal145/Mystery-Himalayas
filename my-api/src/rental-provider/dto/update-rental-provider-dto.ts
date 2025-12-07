import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalProviderDto } from './create-rental-provider-dto';

export class UpdateRentalProviderDto extends PartialType(
  CreateRentalProviderDto,
) {}
