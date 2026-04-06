import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(username: string, email: string, password: string) {
		const studentRole = await this.prismaService.role.findFirst({
			where: { name: Role.STUDENT },
		});

		if (!studentRole) {
			throw new BadRequestException([
				'Comunicate con el administrador: no se encontró el rol de estudiante'
			]);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		return this.prismaService.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				roleId: studentRole.id,
			},
		});
	}

	async findOne(username: string) {
		return this.prismaService.user.findUnique({
			where: { username },
		});
	}

	async findByUsernameOrEmail(usernameOrEmail: string) {
		return this.prismaService.user.findFirst({
			where: {
				OR: [
					{ username: { mode: 'insensitive', equals: usernameOrEmail } },
					{ email: { mode: 'insensitive', equals: usernameOrEmail } },
				],
			},
		});
	}

	async findById(id: number) {
		return this.prismaService.user.findUnique({
			where: { id },
		});
	}

	async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}

