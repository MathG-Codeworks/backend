import { IsNumber, IsPositive, IsInt, Min, Max } from 'class-validator';
import { RoundExists } from 'src/round/validator/exists.validator';

export class CreateRankingDto {
    @IsNumber()
    @IsPositive()
    score!: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    accuracy!: number;

    @IsInt()
    @IsPositive()
    position!: number;

    @IsInt()
    @IsPositive()
    @RoundExists()
    roundId!: number;
}
