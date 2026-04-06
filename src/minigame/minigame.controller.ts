import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinigameService } from './minigame.service';
import { CreateMinigameDto } from './dto/create-minigame.dto';
import { UpdateMinigameDto } from './dto/update-minigame.dto';

@Controller('minigame')
export class MinigameController {
  constructor(private readonly minigameService: MinigameService) {}

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
