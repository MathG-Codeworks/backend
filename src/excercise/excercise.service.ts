import { Injectable } from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { PrismaService } from 'src/prisma.service';
import { Exercise, Prisma } from 'generated/prisma/browser';
import { plainToInstance } from 'class-transformer';
import { ResponseExcerciseDto } from './dto/responde-exercise.dto';

@Injectable()
export class ExcerciseService {
	constructor(private readonly prismaService: PrismaService) { }

	create(createExcerciseDto: CreateExcerciseDto) {
		return 'This action adds a new excercise';
	}

	findAll(): Promise<Exercise[]> {
		return this.prismaService.exercise.findMany();
	}

	findOne(id: number) {
		return `This action returns a #${id} excercise`;
	}

	async findRandomExercises(number: string): Promise<ResponseExcerciseDto[]> {
		const num = parseInt(number);
		if (isNaN(num) || num <= 0) {
			return [];
		}

		const randomExercises = await this.prismaService.$queryRaw<{ id: number }[]>`
			SELECT id
			FROM "exercises"
			ORDER BY RANDOM()
			LIMIT ${num}
		`;

		if (randomExercises.length === 0) {
			return [];
		}

		const exerciseIds = randomExercises.map(({ id }) => id);
		const exercises = await this.prismaService.exercise.findMany({
			where: {
				id: {
					in: exerciseIds,
				},
			},
			include: {
				steps: {
					orderBy: { id: 'desc' },
					take: 1,
					include: {
						options: true,
					},
				},
			},
		});

		const exerciseById = new Map(exercises.map((exercise) => [exercise.id, exercise]));
		const orderedExercises = exerciseIds
			.map((id) => exerciseById.get(id))
			.filter((exercise): exercise is (typeof exercises)[number] => Boolean(exercise));

		return plainToInstance(ResponseExcerciseDto, orderedExercises, { excludeExtraneousValues: true });
	}

	findBrincaBrincaExercises(numberRounds: string) {
		const rounds = parseInt(numberRounds);
		if (isNaN(rounds) || rounds <= 0) {
			return 'Invalid number of rounds';
		}

		return this.prismaService.exercise.findMany({
			take: rounds,
			include: {
				steps: {
					orderBy: { id: 'desc' },
					take: 1,
					include: {
						options: true,
					},
				},
			},
		});
	}

	update(id: number, updateExcerciseDto: UpdateExcerciseDto) {
		return `This action updates a #${id} excercise`;
	}

	remove(id: number) {
		return `This action removes a #${id} excercise`;
	}
}
