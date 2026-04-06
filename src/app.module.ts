import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcerciseModule } from './excercise/excercise.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { StepModule } from './step/step.module';
import { OptionModule } from './option/option.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MatchModule } from './match/match.module';
import { SessionModule } from './session/session.module';
import { RoundModule } from './round/round.module';
import { MinigameModule } from './minigame/minigame.module';
import { RankingModule } from './ranking/ranking.module';
import { AttempModule } from './attemp/attemp.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ExcerciseModule,
    StepModule,
    OptionModule,
    AuthModule,
    UserModule,
    MatchModule,
    SessionModule,
    RoundModule,
    MinigameModule,
    RankingModule,
    AttempModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
