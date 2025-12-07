import { Test, TestingModule } from '@nestjs/testing';
import { RentalProviderService } from './rental-provider.service';

describe('RentalProviderService', () => {
  let service: RentalProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalProviderService],
    }).compile();

    service = module.get<RentalProviderService>(RentalProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
