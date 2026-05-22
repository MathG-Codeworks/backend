import { Injectable } from '@nestjs/common';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseAttempDto } from './dto/response-attemp.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserAttempsPresitionDto } from './dto/response-user-attemps-presition.dto';
import { ResponseAttempByDayDto } from './dto/response-attemp-by-day.dto';
import { ResponseTopPlayersDto } from './dto/response-top-players.dto';
import { ResponseAttempTotalsDto } from './dto/response-attemp-totals.dto';
import { ResponseAttempExerciseSuccessDto } from './dto/response-attemp-exercise-success.dto';

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

	async create(createAttempDto: CreateAttempDto): Promise<ResponseAttempDto> {
		const attemp = await this.prismaService.attemp.create({
			data: {
				userId: createAttempDto.userId,
				isCorrect: createAttempDto.isCorrect,
				exerciseId: createAttempDto.exerciseId,
				optionId: createAttempDto.optionId
			},
		});

		return plainToInstance(ResponseAttempDto, attemp);
	}

	async getTotals(): Promise<ResponseAttempTotalsDto> {
		const total = await this.prismaService.attemp.count();
		const correct = await this.prismaService.attemp.count({ where: { isCorrect: true } });
		const incorrect = total - correct;

		return plainToInstance(ResponseAttempTotalsDto, {
			total,
			correct,
			incorrect,
		});
	}

	async getTopCorrect(take = 5): Promise<ResponseTopPlayersDto[]> {
		// Group correct attempts by userId
		// Prisma's generated groupBy typings are strict and sometimes incompatible with our usage here.
		// Cast `attemp` to any to avoid complex type issues and keep the runtime query intact.
		// Use _count on `userId` (supported by generated Prisma client) instead of `_all`.
		const groups = await (this.prismaService.attemp as any).groupBy({
			by: ['userId'],
			where: { isCorrect: true },
			_count: { userId: true },
			orderBy: [{ _count: { userId: 'desc' } } as any],
			take,
		}) as Array<{ userId: number; _count: { userId: number } }>; 

		const userIds = groups.map((g) => g.userId);
		const users = await this.prismaService.user.findMany({
			where: { id: { in: userIds } },
			select: { id: true, username: true },
		});

		const userMap = new Map<number, string>(users.map((u) => [u.id, u.username]));

		return groups.map((g) => {
				const count = (g._count && typeof g._count === 'object' ? (g._count as any).userId : 0) as number
			return plainToInstance(ResponseTopPlayersDto, {
				userId: g.userId,
				username: userMap.get(g.userId) ?? `user:${g.userId}`,
				correct: count,
			})
		})
	}

	/**
	 * Obtiene la tasa de éxito (correct/incorrect) agrupada por ejercicio
	 */
	async getSuccessByExercise(): Promise<ResponseAttempExerciseSuccessDto[]> {
		// Use groupBy to aggregate totals per exercise (avoid duplicates per user)
		// total attempts per exercise
		const totals = await (this.prismaService.attemp as any).groupBy({
			by: ['exerciseId'],
			_count: { exerciseId: true },
			orderBy: [{ _count: { exerciseId: 'desc' } }],
		}) as Array<{ exerciseId: number; _count: { exerciseId: number } }>;

		// correct attempts per exercise
		const corrects = await (this.prismaService.attemp as any).groupBy({
			by: ['exerciseId'],
			where: { isCorrect: true },
			_count: { exerciseId: true },
		}) as Array<{ exerciseId: number; _count: { exerciseId: number } }>;

		const correctMap = new Map<number, number>(corrects.map((c) => [c.exerciseId, c._count.exerciseId]));

		const exerciseIds = totals.map((t) => t.exerciseId);
		const exercises = await this.prismaService.exercise.findMany({ where: { id: { in: exerciseIds } }, select: { id: true, operation: true, description: true } });
		const exerciseMap = new Map<number, { operation?: string; description?: string }>(exercises.map((e) => [e.id, { operation: e.operation, description: e.description }]));

		const result = totals.map((t) => {
			const correct = correctMap.get(t.exerciseId) ?? 0;
			const total = t._count.exerciseId ?? 0;
			const incorrect = total - correct;
			const ex = exerciseMap.get(t.exerciseId);
			const title = ex?.operation ?? ex?.description ?? `exercise:${t.exerciseId}`;
			return {
				exerciseId: t.exerciseId,
				title,
				correct,
				incorrect,
				total,
				successRate: total === 0 ? 0 : Math.round((correct / total) * 10000) / 100,
			}
		})

		return plainToInstance(ResponseAttempExerciseSuccessDto, result)
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
