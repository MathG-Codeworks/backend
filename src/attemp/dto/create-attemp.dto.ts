import { IsBoolean, IsInt, IsPositive } from "class-validator";
import { ExerciseExists } from "src/excercise/validator/exists.validator";
import { OptionExists } from "src/option/validator/exists.validator";

export class CreateAttempDto {
    @IsBoolean()
    isCorrect!: boolean;

    @IsInt()
    @IsPositive()
    @ExerciseExists()
    exerciseId!: number;

    @IsInt()
    @IsPositive()
    @OptionExists()
    optionId!: number;
}
