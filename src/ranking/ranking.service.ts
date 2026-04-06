import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseRankingDto } from './dto/response-ranking.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RankingService {
	constructor(
		private readonly prismaService: PrismaService,
	) {}

	async create(userId: number, createRankingDto: CreateRankingDto): Promise<ResponseRankingDto> {
		const ranking = await this.prismaService.ranking.create({
			data: {
				userId: userId,
				roundId: createRankingDto.roundId,
				score: createRankingDto.score,
				position: createRankingDto.position,
				accuracy: createRankingDto.accuracy
			}
		});

		return plainToInstance(ResponseRankingDto, ranking);
	}

	findAll() {
		return `This action returns all ranking`;
	}

	findOne(id: number) {
		return `This action returns a #${id} ranking`;
	}

	update(id: number, updateRankingDto: UpdateRankingDto) {
		return `This action updates a #${id} ranking`;
	}

	remove(id: number) {
		return `This action removes a #${id} ranking`;
	}
}
