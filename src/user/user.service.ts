import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(username: string, email: string, password: string) {
		const hashedPassword = await bcrypt.hash(password, 10);
		return this.prismaService.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
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
				OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
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

