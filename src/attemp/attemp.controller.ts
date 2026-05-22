import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AttempService } from './attemp.service';
import { CreateAttempDto } from './dto/create-attemp.dto';
import { UpdateAttempDto } from './dto/update-attemp.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';
import { ResponseUserAttempsPresitionDto } from './dto/response-user-attemps-presition.dto';
import { ResponseAttempByDayDto } from './dto/response-attemp-by-day.dto';
import { ResponseTopPlayersDto } from './dto/response-top-players.dto';
import { ResponseAttempExerciseSuccessDto } from './dto/response-attemp-exercise-success.dto';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('attemp')
export class AttempController {
	constructor(private readonly attempService: AttempService) { }

	@UseGuards(AuthGuard)
	@Get('user/presition')
	getPresition(@Request() req: ExpressRequest): Promise<ResponseUserAttempsPresitionDto> {
		const user = (req as any).user as AuthenticatedUser;
		return this.attempService.getPresition(user.id);
	}

	@UseGuards(AuthGuard)
	@Get('user/by-day')
	getByDay(@Request() req: ExpressRequest): Promise<ResponseAttempByDayDto[]> {
		const user = (req as any).user as AuthenticatedUser;
		return this.attempService.getByDay(user.id);
	}

	@UseGuards(AuthGuard)
	@Get('total')
	getTotals(): Promise<import('./dto/response-attemp-totals.dto').ResponseAttempTotalsDto> {
		return this.attempService.getTotals();
	}

	@UseGuards(AuthGuard)
	@Get('top-correct')
	getTopCorrect(): Promise<ResponseTopPlayersDto[]> {
		return this.attempService.getTopCorrect();
	}

	@UseGuards(AuthGuard)
	@Get('exercise-success')
	getExerciseSuccess(): Promise<ResponseAttempExerciseSuccessDto[]> {
		return this.attempService.getSuccessByExercise();
	}

	@Post()
	create(@Body() createAttempDto: CreateAttempDto) {
		return this.attempService.create(createAttempDto);
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
