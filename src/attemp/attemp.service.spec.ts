import { Test, TestingModule } from '@nestjs/testing';
import { AttempService } from './attemp.service';

describe('AttempService', () => {
  let service: AttempService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttempService],
    }).compile();

    service = module.get<AttempService>(AttempService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
