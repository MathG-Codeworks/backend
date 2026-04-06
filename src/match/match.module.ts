import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { IsMatchIdUniqueConstraint } from './validator/unique.validator';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MatchController],
  providers: [MatchService, IsMatchIdUniqueConstraint],
})
export class MatchModule {}
