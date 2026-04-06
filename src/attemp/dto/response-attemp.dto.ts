import { Expose } from "class-transformer";

export class ResponseAttempDto {
    @Expose()
    id!: number;

    @Expose()
    isCorrect!: boolean;

    @Expose()
    number!: number;

    @Expose()
    exerciseId!: number;

    @Expose()
    userId!: number;

    @Expose()
    optionId!: number;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;
}