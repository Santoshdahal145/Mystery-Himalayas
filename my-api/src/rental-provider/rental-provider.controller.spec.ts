import { Test, TestingModule } from '@nestjs/testing';
import { RentalProviderController } from './rental-provider.controller';

describe('RentalProviderController', () => {
  let controller: RentalProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalProviderController],
    }).compile();

    controller = module.get<RentalProviderController>(RentalProviderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
