import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ValidateMatchExistsPipe implements PipeTransform {
    constructor(private prismaService: PrismaService) { }

    async transform(value: string) {
        const match = await this.prismaService.match.findUnique({
            where: { id: value }
        });

        if (!match) {
            throw new BadRequestException(`El match con id '${value}' no existe`);
        }

        return value;
    }
}