import { CreateStepDto } from 'src/step/dto/create-step.dto';

export class CreateExcerciseDto {
  operation: string;
  description: string;
  steps: CreateStepDto[];
}
