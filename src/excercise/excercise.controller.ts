import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ExcerciseService } from './excercise.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { ResponseExcerciseDto } from './dto/responde-exercise.dto';

@Controller('exercise')
export class ExcerciseController {
	constructor(private readonly excerciseService: ExcerciseService) { }

	@Post()
	create(@Body() createExcerciseDto: CreateExcerciseDto) {
		return this.excerciseService.create(createExcerciseDto);
	}

	@Get()
	findAll() {
		return this.excerciseService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.excerciseService.findOne(+id);
	}

	@Get('random/:number')
	findRandomExercises(@Param('number') number: string): Promise<ResponseExcerciseDto[]> {
		return this.excerciseService.findRandomExercises(number);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateExcerciseDto: UpdateExcerciseDto,
	) {
		return this.excerciseService.update(+id, updateExcerciseDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.excerciseService.remove(+id);
	}
}
