import { Injectable } from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { PrismaService } from 'src/prisma.service';
import { Exercise, Prisma } from 'generated/prisma/browser';

@Injectable()
export class ExcerciseService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createExcerciseDto: CreateExcerciseDto) {
    return 'This action adds a new excercise';
  }

  findAll(): Promise<Exercise[]> {
    return this.prismaService.exercise.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} excercise`;
  }

  findBrincaBrincaExercises(numberRounds: string) {
    const rounds = parseInt(numberRounds);
    if (isNaN(rounds) || rounds <= 0) {
      return 'Invalid number of rounds';
    }

    return this.prismaService.exercise.findMany({
      take: rounds,
      include: {
        steps: {
          orderBy: { id: 'desc' },
          take: 1,
          include: {
            options: true,
          },
        },
      },
    });
  }

  update(id: number, updateExcerciseDto: UpdateExcerciseDto) {
    return `This action updates a #${id} excercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} excercise`;
  }
}
