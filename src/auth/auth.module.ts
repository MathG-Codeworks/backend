import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET || 'secret-key',
			signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600', 10) },
		})
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule { }
