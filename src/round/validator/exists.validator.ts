import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'roundExists', async: true })
@Injectable()
export class RoundExistsConstraint implements ValidatorConstraintInterface {
    constructor(private prismaService: PrismaService) {}

    async validate(value: number, args: ValidationArguments) {
        const round = await this.prismaService.round.findUnique({ 
            where: { id: value } 
        });
        return !!round;
    }

    defaultMessage(args: ValidationArguments) {
        return `El round con id '${args.value}' no existe`;
    }
}

export function RoundExists(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: RoundExistsConstraint,
        });
    };
}
