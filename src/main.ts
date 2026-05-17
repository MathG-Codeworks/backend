import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const allowedOrigins = [
		'http://localhost:3000',
		'http://127.0.0.1:3000',
		process.env.FRONTEND_URL,
	].filter((origin): origin is string => Boolean(origin));

	app.enableCors({
		origin: allowedOrigins,
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});
	
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	}));

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), {
		strategy: 'excludeAll',
	}));

	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
