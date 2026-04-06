import { Injectable } from '@nestjs/common';
import { CreateMinigameDto } from './dto/create-minigame.dto';
import { UpdateMinigameDto } from './dto/update-minigame.dto';

@Injectable()
export class MinigameService {
  create(createMinigameDto: CreateMinigameDto) {
    return 'This action adds a new minigame';
  }

  findAll() {
    return `This action returns all minigame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} minigame`;
  }

  update(id: number, updateMinigameDto: UpdateMinigameDto) {
    return `This action updates a #${id} minigame`;
  }

  remove(id: number) {
    return `This action removes a #${id} minigame`;
  }
}
