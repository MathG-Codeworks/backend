import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AttempService } from './attemp.service';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('attemp')
export class AttempController {
	constructor(private readonly attempService: AttempService) { }

	@Post()
	@UseGuards(AuthGuard)
	create(
		@Request() req: ExpressRequest,
		@Body() createAttempDto: CreateAttempDto
	) {
		const user = (req as any).user as AuthenticatedUser;
		return this.attempService.create(user.id, createAttempDto);
	}

	// @Get()
	// findAll() {
	// 	return this.attempService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.attempService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateAttempDto: UpdateAttempDto) {
	// 	return this.attempService.update(+id, updateAttempDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.attempService.remove(+id);
	// }
}
