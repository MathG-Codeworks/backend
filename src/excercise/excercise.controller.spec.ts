import { Test, TestingModule } from '@nestjs/testing';
import { ExcerciseController } from './excercise.controller';
import { ExcerciseService } from './excercise.service';

describe('ExcerciseController', () => {
  let controller: ExcerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcerciseController],
      providers: [ExcerciseService],
    }).compile();

    controller = module.get<ExcerciseController>(ExcerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
