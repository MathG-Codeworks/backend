import { Module } from '@nestjs/common';
import { ExcerciseService } from './excercise.service';
import { ExcerciseController } from './excercise.controller';

@Module({
  controllers: [ExcerciseController],
  providers: [ExcerciseService],
})
export class ExcerciseModule {}
