import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'exerciseExists', async: true })
@Injectable()
export class ExerciseExistsConstraint implements ValidatorConstraintInterface {
    constructor(private prismaService: PrismaService) {}

    async validate(value: number, args: ValidationArguments) {
        const exercise = await this.prismaService.exercise.findUnique({ 
            where: { id: value } 
        });
        return !!exercise;
    }

    defaultMessage(args: ValidationArguments) {
        return `El exercise con id '${args.value}' no existe`;
    }
}

export function ExerciseExists(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ExerciseExistsConstraint,
        });
    };
}
