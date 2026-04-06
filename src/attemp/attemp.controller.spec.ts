import { Test, TestingModule } from '@nestjs/testing';
import { AttempController } from './attemp.controller';
import { AttempService } from './attemp.service';

describe('AttempController', () => {
  let controller: AttempController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttempController],
      providers: [AttempService],
    }).compile();

    controller = module.get<AttempController>(AttempController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
