import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseMatchDto } from './dto/response-match.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MatchService {

	constructor(
		private readonly prismaService: PrismaService,
	) {}

	async create(createMatchDto: CreateMatchDto): Promise<ResponseMatchDto> {
		const match = await this.prismaService.match.create({
			data: {
				id: createMatchDto.id,
				code: createMatchDto.code,
			}
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

	findAll() {
		return `This action returns all match`;
	}

	findOne(id: number) {
		return `This action returns a #${id} match`;
	}

	update(id: number, updateMatchDto: UpdateMatchDto) {
		return `This action updates a #${id} match`;
	}

	remove(id: number) {
		return `This action removes a #${id} match`;
	}
}
