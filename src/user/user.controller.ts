import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<ResponseUserDto[]> {
		const users = await this.userService.findAll();
		return plainToInstance(ResponseUserDto, users);
	}
}