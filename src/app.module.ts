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
import { IsMatchIdUniqueConstraint } from './match/validator/unique.validator';
import { SessionModule } from './session/session.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
