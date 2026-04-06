import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { OptionExistsConstraint } from './validator/exists.validator';

@Module({
  controllers: [OptionController],
  providers: [OptionService, OptionExistsConstraint],
})
export class OptionModule {}
