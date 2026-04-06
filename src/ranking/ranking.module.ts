import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { UserModule } from 'src/user/user.module';
import { RoundModule } from 'src/round/round.module';

@Module({
	imports: [UserModule, RoundModule],
	controllers: [RankingController],
	providers: [RankingService],
})
export class RankingModule { }
