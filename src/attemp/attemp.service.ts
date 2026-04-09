import { Injectable } from '@nestjs/common';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseAttempDto } from './dto/response-attemp.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserAttempsPresitionDto } from './dto/response-user-attemps-presition.dto';
import { ResponseAttempByDayDto } from './dto/response-attemp-by-day.dto';

@Injectable()
export class AttempService {
	constructor(
		private readonly prismaService: PrismaService,
	) {}

	/**
	 * Obtiene el total de intentos correctos e incorrectos agrupados por día
	 * @param userId - ID del usuario
	 * @returns Estadísticas de intentos por día
	 */
	async getByDay(userId: number): Promise<ResponseAttempByDayDto[]> {
		const attemps = await this.prismaService.attemp.findMany({
			where: { userId: userId },
			orderBy: { createdAt: 'asc' },
		});

		const statsByDay = new Map<string, { correct: number; incorrect: number }>();

		attemps.forEach((attemp) => {
			const date = attemp.createdAt.toLocaleDateString('en-CA', {
				timeZone: 'America/Bogota'
			});

			if (!statsByDay.has(date)) {
				statsByDay.set(date, { correct: 0, incorrect: 0 });
			}
			const stats = statsByDay.get(date)!;
			if (attemp.isCorrect) {
				stats.correct++;
			} else {
				stats.incorrect++;
			}
		});

		const stats: ResponseAttempByDayDto[] = Array.from(statsByDay).map(([date, counts]) =>
			plainToInstance(ResponseAttempByDayDto, {
				date,
				correct: counts.correct,
				incorrect: counts.incorrect,
				total: counts.correct + counts.incorrect,
			})
		);

		return stats;
	}

	/**
	 * Calcula la precisión porcentual global del usuario
	 * @param userId - ID del usuario
	 * @returns Porcentaje de precisión (0-100)
	 */
	async getPresition(userId: number): Promise<ResponseUserAttempsPresitionDto> {
		const attemps = await this.prismaService.attemp.findMany({
			where: { userId: userId },
		});

		const correctAttemps = attemps.filter(attemp => attemp.isCorrect).length;
		const incorrectAttemps = attemps.length - correctAttemps;
		const precision = attemps.length === 0 ? 0 : (correctAttemps / attemps.length) * 100;
		
		return plainToInstance(ResponseUserAttempsPresitionDto, {
			total: correctAttemps + incorrectAttemps,
			correct: correctAttemps,
			incorrect: incorrectAttemps,
			presition: Math.round(precision * 100) / 100,
		});
	}

	async create(userId: number, createAttempDto: CreateAttempDto): Promise<ResponseAttempDto> {
		const attemp = await this.prismaService.attemp.create({
			data: {
				userId: userId,
				isCorrect: createAttempDto.isCorrect,
				exerciseId: createAttempDto.exerciseId,
				optionId: createAttempDto.optionId
			},
		});

		return plainToInstance(ResponseAttempDto, attemp);
	}

	findAll() {
		return `This action returns all attemp`;
	}

	findOne(id: number) {
		return `This action returns a #${id} attemp`;
	}

	update(id: number, updateAttempDto: UpdateAttempDto) {
		return `This action updates a #${id} attemp`;
	}

	remove(id: number) {
		return `This action removes a #${id} attemp`;
	}
}
