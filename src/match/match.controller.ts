import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ResponseMatchDto } from './dto/response-match.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';
import { ValidateMatchExistsPipe } from './validator/exists.validator';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('match')
export class MatchController {
	constructor(private readonly matchService: MatchService) { }

	@Post()
	create(@Body() createMatchDto: CreateMatchDto): Promise<ResponseMatchDto> {
		return this.matchService.create(createMatchDto);
	}

	@Post(':id/join')
    @UseGuards(AuthGuard)
    join(
		@Param('id', ValidateMatchExistsPipe) matchId: string, 
		@Request() req: ExpressRequest
	): Promise<ResponseMatchDto> {
        const user = (req as any).user as AuthenticatedUser;
        return this.matchService.join(matchId, user.id);
    }

	// @Get()
	// findAll() {
	//   return this.matchService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.matchService.findOne(+id);
	// }

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
		return this.matchService.update(+id, updateMatchDto);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.matchService.remove(+id);
	// }
}
