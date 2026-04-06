import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'optionExists', async: true })
@Injectable()
export class OptionExistsConstraint implements ValidatorConstraintInterface {
    constructor(private prismaService: PrismaService) {}

    async validate(value: number, args: ValidationArguments) {
        const option = await this.prismaService.option.findUnique({ 
            where: { id: value } 
        });
        return !!option;
    }

    defaultMessage(args: ValidationArguments) {
        return `La opción con id '${args.value}' no existe`;
    }
}

export function OptionExists(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: OptionExistsConstraint,
        });
    };
}
