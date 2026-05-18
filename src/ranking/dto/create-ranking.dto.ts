import { IsNumber, IsPositive, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { RoundExists } from 'src/round/validator/exists.validator';

export class CreateRankingDto {

    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    @IsNumber()
    userId!: number;

    @IsNumber()
    score!: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    accuracy!: number;

    @IsInt()
    position!: number;

    @IsInt()
    roundId!: number;
}
