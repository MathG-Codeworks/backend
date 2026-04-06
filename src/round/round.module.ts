import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { RoundExistsConstraint } from './validator/exists.validator';

@Module({
  controllers: [RoundController],
  providers: [RoundService, RoundExistsConstraint],
})
export class RoundModule {}
