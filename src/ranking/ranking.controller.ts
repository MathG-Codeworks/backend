import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { ResponseRankingDto } from './dto/response-ranking.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('ranking')
export class RankingController {
	constructor(private readonly rankingService: RankingService) { }

	@Post()
	@UseGuards(AuthGuard)
	create(
		@Request() req: ExpressRequest,
		@Body() createRankingDto: CreateRankingDto
	) : Promise<ResponseRankingDto> {
		const user = (req as any).user as AuthenticatedUser;
		return this.rankingService.create(user.id, createRankingDto);
	}

	// @Get()
	// findAll() {
	// 	return this.rankingService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.rankingService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
	// 	return this.rankingService.update(+id, updateRankingDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.rankingService.remove(+id);
	// }
}
