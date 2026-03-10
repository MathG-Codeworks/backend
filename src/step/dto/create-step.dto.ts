import { CreateOptionDto } from 'src/option/dto/create-option.dto';

export class CreateStepDto {
  description: string;
  options: CreateOptionDto[];
}
