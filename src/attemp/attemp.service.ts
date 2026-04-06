import { Injectable } from '@nestjs/common';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseAttempDto } from './dto/response-attemp.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AttempService {
	constructor(
		private readonly prismaService: PrismaService,
	) {}

	async create(userId: number, createAttempDto: CreateAttempDto): Promise<ResponseAttempDto> {
		const existingAttemp = await this.prismaService.attemp.findFirst({
			where: {
				userId: userId,
				optionId: createAttempDto.optionId,
			},
		});

		const attemp = existingAttemp
			? await this.prismaService.attemp.update({
				where: { id: existingAttemp.id },
				data: {
					number: existingAttemp.number + 1,
				}
			})
			: await this.prismaService.attemp.create({
				data: {
					number: 1,
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
