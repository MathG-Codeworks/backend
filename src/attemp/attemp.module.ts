import { Module } from '@nestjs/common';
import { AttempService } from './attemp.service';
import { AttempController } from './attemp.controller';
import { ExcerciseModule } from 'src/excercise/excercise.module';
import { OptionModule } from 'src/option/option.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [UserModule, ExcerciseModule, OptionModule],
  	controllers: [AttempController],
	providers: [AttempService],
})
export class AttempModule { }
