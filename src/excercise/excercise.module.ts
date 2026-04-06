import { Module } from '@nestjs/common';
import { ExcerciseService } from './excercise.service';
import { ExcerciseController } from './excercise.controller';
import { ExerciseExistsConstraint } from './validator/exists.validator';

@Module({
  controllers: [ExcerciseController],
  providers: [ExcerciseService, ExerciseExistsConstraint],
})
export class ExcerciseModule {}
