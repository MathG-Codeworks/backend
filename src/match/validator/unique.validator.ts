import { ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'isMatchIdUnique', async: true })
@Injectable()
export class IsMatchIdUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly prismaService: PrismaService) { }

    async validate(value: string, args: ValidationArguments) {
        const match = await this.prismaService.match.findUnique({
            where: { id: value }
        });
        return !match;
    }

    defaultMessage(args: ValidationArguments) {
        return `El id del match '${args.value}' ya está en uso`;
    }
}

export function IsMatchIdUnique(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsMatchIdUniqueConstraint,
        });
    };
}