import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcerciseModule } from './excercise/excercise.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { StepModule } from './step/step.module';
import { OptionModule } from './option/option.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ExcerciseModule,
    StepModule,
    OptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
