import { Option } from 'src/option/entities/option.entity';

export class Step {
  id: number;
  exerciseId: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  options?: Option[];
}
