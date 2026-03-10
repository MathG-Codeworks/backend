import { Step } from 'src/step/entities/step.entity';

export class Excercise {
  id: number;
  operation: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  steps?: Step[];
}
