import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ResponseSessionDto } from './dto/response-session.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('session')
export class SessionController {
	constructor(private readonly sessionService: SessionService) { }

	@UseGuards(AuthGuard)
	@Post()
	create(@Request() req: ExpressRequest, @Body() createSessionDto: CreateSessionDto) : Promise<ResponseSessionDto> {
		const user = (req as any).user as AuthenticatedUser;
		return this.sessionService.create(user.id, createSessionDto);
	}

	// @Get()
	// findAll() {
	// 	return this.sessionService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.sessionService.findOne(+id);
	// }

	// @UseGuards(AuthGuard)
	// @Patch(':id')
	// update(
	// 	@Request() req: ExpressRequest, 
	// 	@Param('id') id: string, 
	// 	@Body() updateSessionDto: UpdateSessionDto
	// ) {
	// 	const user = (req as any).user as AuthenticatedUser;
	// 	return this.sessionService.update(+id, updateSessionDto);
	// }

	@UseGuards(AuthGuard)
	@Patch(':id/end')
	updateEndTime(@Request() req: ExpressRequest, @Param('id') id: string) : Promise<ResponseSessionDto> {
		const user = (req as any).user as AuthenticatedUser;
		return this.sessionService.updateEndTime(user.id, +id);
	}


	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.sessionService.remove(+id);
	// }
}
