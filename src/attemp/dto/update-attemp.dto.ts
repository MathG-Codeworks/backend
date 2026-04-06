import { PartialType } from '@nestjs/mapped-types';
import { CreateAttempDto } from './create-attemp.dto';

export class UpdateAttempDto extends PartialType(CreateAttempDto) {}
