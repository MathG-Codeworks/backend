import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseSessionDto } from './dto/response-session.dto';
import { ResponseSessionByDayDto } from './dto/response-session-by-day.dto';
import { ResponseSessionTotalDto } from './dto/response-session-total.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SessionService {

	constructor(
		private readonly prismaService: PrismaService,
	) { }

	async getTotal(): Promise<ResponseSessionTotalDto> {
		const total = await this.prismaService.session.count();
		return plainToInstance(ResponseSessionTotalDto, { total });
	}

	async getByDay(): Promise<ResponseSessionByDayDto[]> {
		const today = new Date();
		const windowStart = new Date(today);
		windowStart.setDate(today.getDate() - 29);
		windowStart.setHours(0, 0, 0, 0);

		const sessions = await this.prismaService.session.findMany({
			where: {
				start: {
					gte: windowStart,
				},
			},
			orderBy: { start: 'asc' },
		});

		const timeZone = 'America/Bogota';
		const dayEntries = Array.from({ length: 30 }, (_, index) => {
			const date = new Date(today);
			date.setDate(today.getDate() - (29 - index));
			date.setHours(0, 0, 0, 0);
			return date.toLocaleDateString('en-CA', { timeZone });
		});

		const countsByDay = new Map(dayEntries.map((date) => [date, 0]));

		sessions.forEach((session) => {
			const date = session.start.toLocaleDateString('en-CA', { timeZone });
			if (countsByDay.has(date)) {
				countsByDay.set(date, (countsByDay.get(date) ?? 0) + 1);
			}
		});

		return dayEntries.map((date) =>
			plainToInstance(ResponseSessionByDayDto, {
				date,
				count: countsByDay.get(date) ?? 0,
			}),
		);
	}

	async getTotalTime(userId: number): Promise<number> {
		const sessions = await this.prismaService.session.findMany({
			where: { userId: userId },
		});

		const totalTime = sessions.reduce((total, session) => {
			if (session.end) {
				const start = session.start.getTime();
				const end = session.end.getTime();
				return total + (end - start);
			}
			return total;
		}, 0);

		return totalTime;
	}

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
