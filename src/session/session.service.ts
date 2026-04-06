import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseSessionDto } from './dto/response-session.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SessionService {

	constructor(
		private readonly prismaService: PrismaService,
	) { }

	async create(userId: number, createSessionDto: CreateSessionDto) : Promise<ResponseSessionDto> {
		const session = await this.prismaService.session.create({
			data: {
				platform: createSessionDto.platform,
				device: createSessionDto.device,
				userId: userId,
			},
		});

		return plainToInstance(ResponseSessionDto, session);
	}

	findAll() {
		return `This action returns all session`;
	}

	findOne(id: number) {
		return `This action returns a #${id} session`;
	}

	update(id: number, updateSessionDto: UpdateSessionDto) {
		return `This action updates a #${id} session`;
	}

	async updateEndTime(userId: number, id: number) : Promise<ResponseSessionDto> {
		const session = await this.prismaService.session.findFirst({
			where: {
				id: id,
				userId: userId,
			},
		});

		if (!session) {
			throw new BadRequestException(`La sesión con id '${id}' no existe o no pertenece al usuario`);
		}

		const updatedSession = await this.prismaService.session.update({
			where: { id: id },
			data: { end: new Date() },
		});

		return plainToInstance(ResponseSessionDto, updatedSession);
	}

	remove(id: number) {
		return `This action removes a #${id} session`;
	}
}
