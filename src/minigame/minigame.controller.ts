import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MinigameService } from './minigame.service';
import { CreateMinigameDto } from './dto/create-minigame.dto';
import { UpdateMinigameDto } from './dto/update-minigame.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';
import { ResponseUserMinigamesPerformanceDto } from './dto/response-user-minigames-performance.dto';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('minigame')
export class MinigameController {
	constructor(private readonly minigameService: MinigameService) { }

	@UseGuards(AuthGuard)
	@Get('user/performance')
	async getUserPerformance(@Request() req: ExpressRequest): Promise<ResponseUserMinigamesPerformanceDto[]> {
		const user = (req as any).user as AuthenticatedUser;
		return this.minigameService.getUserPerformance(user.id);
	}

  // @Post()
  // create(@Body() createMinigameDto: CreateMinigameDto) {
  //   return this.minigameService.create(createMinigameDto);
  // }

  // @Get()
  // findAll() {
  //   return this.minigameService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.minigameService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMinigameDto: UpdateMinigameDto) {
  //   return this.minigameService.update(+id, updateMinigameDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.minigameService.remove(+id);
  // }
}
