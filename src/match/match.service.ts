import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseMatchDto } from './dto/response-match.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseMatchSummaryDto } from './dto/response-match-summary.dto';
import { ResponseMatchDetailDto } from './dto/response-match-detail.dto';

@Injectable()
export class MatchService {

	constructor(
		private readonly prismaService: PrismaService,
	) {}

	async create(createMatchDto: CreateMatchDto): Promise<ResponseMatchDto> {
		const minigame = await this.prismaService.minigame.findFirst();

		if (!minigame) {
			throw new BadRequestException(['No hay minijuegos disponibles']);
		}

		const match = await this.prismaService.match.create({
			data: {
				id: createMatchDto.id,
				code: createMatchDto.code,
				rounds: {
					createMany: {
						data: Array(createMatchDto.rounds).fill(0).map(() => ({
							minigameId: minigame?.id,
						})),
					},
				},
			},
			include: {
				rounds: {
					include: {
						minigame: true,
					},
				},
			},
		});

		return plainToInstance(ResponseMatchDto, match);
	}

	async join(matchId: string, userId: number): Promise<ResponseMatchDto> {
		const existingUserMatch = await this.prismaService.userMatch.findFirst({
			where: {
				userId: userId,
				matchId: matchId
			}
		});

		if (existingUserMatch) {
			throw new BadRequestException(['El usuario ya está unido a este match']);
		}

		const match = await this.prismaService.match.update({
			where: { id: matchId },
			data: {
				users: {
					create: {
						userId: userId,
					}
				},
			},
		});

		return plainToInstance(ResponseMatchDto, match);
	}

	async findAll(): Promise<ResponseMatchSummaryDto[]> {
		const matches = await this.prismaService.match.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				_count: {
					select: {
						rounds: true,
						users: true,
					},
				},
			},
		});

		return plainToInstance(ResponseMatchSummaryDto, matches.map((match) => ({
			id: match.id,
			code: match.code,
			createdAt: match.createdAt,
			updatedAt: match.updatedAt,
			roundsCount: match._count.rounds,
			playersCount: match._count.users,
		})));
	}

	async findOne(matchId: string): Promise<ResponseMatchDetailDto> {
		const match = await this.prismaService.match.findUnique({
			where: { id: matchId },
			include: {
				users: {
					include: {
						user: {
							select: {
								id: true,
								username: true,
							},
						},
					},
				},
				rounds: {
					include: {
						minigame: {
							select: {
								id: true,
								name: true,
								description: true,
							},
						},
						rankings: {
							orderBy: [
								{ position: 'asc' },
								{ score: 'desc' },
							],
							include: {
								user: {
									select: {
										id: true,
										username: true,
									},
								},
							},
						},
					},
				},
			},
		});

		if (!match) {
			return plainToInstance(ResponseMatchDetailDto, {
				id: matchId,
				code: '',
				createdAt: new Date(),
				updatedAt: new Date(),
				users: [],
				rounds: [],
			});
		}

		return plainToInstance(ResponseMatchDetailDto, {
			id: match.id,
			code: match.code,
			createdAt: match.createdAt,
			updatedAt: match.updatedAt,
			users: match.users.map((userMatch) => ({
				id: userMatch.user.id,
				username: userMatch.user.username,
			})),
			rounds: match.rounds.map((round) => ({
				id: round.id,
				minigameId: round.minigameId,
				minigameName: round.minigame.name,
				minigameDescription: round.minigame.description,
				createdAt: round.createdAt,
				updatedAt: round.updatedAt,
				rankings: round.rankings.map((ranking) => ({
					id: ranking.id,
					userId: ranking.userId,
					username: ranking.user.username,
					score: ranking.score,
					accuracy: ranking.accuracy,
					position: ranking.position,
				})),
			})),
		});
	}

	update(id: number, updateMatchDto: UpdateMatchDto) {
		return `This action updates a #${id} match`;
	}

	remove(id: number) {
		return `This action removes a #${id} match`;
	}
}
