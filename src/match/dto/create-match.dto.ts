import { IsString, IsNotEmpty } from 'class-validator';
import { IsMatchIdUnique } from '../validator/unique.validator';

export class CreateMatchDto {
    @IsString({ message: 'El id del juego debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El id del juego es obligatorio' })
    @IsMatchIdUnique({ message: 'El id del juego ya existe' })
    id!: string;

    @IsString({ message: 'El código del juego debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El código del juego es obligatorio' })
    code!: string;
}
