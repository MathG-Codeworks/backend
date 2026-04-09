import { Injectable } from '@nestjs/common';
import { CreateMinigameDto } from './dto/create-minigame.dto';
import { UpdateMinigameDto } from './dto/update-minigame.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseUserMinigamesPerformanceDto } from './dto/response-user-minigames-performance.dto';

interface MinigameStat {
	id: number;
	name: string;
	description: string;
	category: string;
	scores: number[];
	accuracies: number[];
	positions: number[];
}

@Injectable()
export class MinigameService {
	constructor(private readonly prismaService: PrismaService) { }

	create(createMinigameDto: CreateMinigameDto) {
		return 'This action adds a new minigame';
	}

	findAll() {
		return `This action returns all minigame`;
	}

	findOne(id: number) {
		return `This action returns a #${id} minigame`;
	}

	update(id: number, updateMinigameDto: UpdateMinigameDto) {
		return `This action updates a #${id} minigame`;
	}

	remove(id: number) {
		return `This action removes a #${id} minigame`;
	}

	/**
	 * Obtiene el KPI de desempeño del usuario en cada minijuego
	 * @param userId - ID del usuario
	 * @returns Array con KPI de cada minijuego ordenado por desempeño
	 */
	async getUserPerformance(userId: number): Promise<ResponseUserMinigamesPerformanceDto[]> {
		const rankings = await this.prismaService.ranking.findMany({
			where: { userId: userId },
			include: {
				round: {
					include: {
						minigame: {
							include: {
								category: true,
							},
						},
					},
				},
			},
		});

		const minigameStats = new Map<number, MinigameStat>();

		rankings.forEach((ranking) => {
			const minigame = ranking.round.minigame;
			const key = minigame.id;

			if (!minigameStats.has(key)) {
				minigameStats.set(key, {
					id: minigame.id,
					name: minigame.name,
					description: minigame.description,
					category: minigame.category.name,
					scores: [],
					accuracies: [],
					positions: [],
				});
			}

			const stats = minigameStats.get(key)!;
			stats.scores.push(ranking.score);
			stats.accuracies.push(ranking.accuracy);
			stats.positions.push(ranking.position);
		});

		const kpiList: ResponseUserMinigamesPerformanceDto[] = [];

		minigameStats.forEach((stats) => {
			const avgScore = stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length;
			const avgAccuracy = stats.accuracies.reduce((a, b) => a + b, 0) / stats.accuracies.length;
			const avgPosition = stats.positions.reduce((a, b) => a + b, 0) / stats.positions.length;

			kpiList.push({
				id: stats.id,
				name: stats.name,
				description: stats.description,
				category: stats.category,
				rounds: stats.scores.length,
				score: Math.round(avgScore * 100) / 100,
				accuracy: Math.round(avgAccuracy * 100) / 100,
				position: Math.round(avgPosition * 100) / 100,
			});
		});

		return kpiList.sort((a, b) => {
			if (b.accuracy !== a.accuracy) {
				return b.accuracy - a.accuracy;
			}
			return a.position - b.position;
		});
	}
}
