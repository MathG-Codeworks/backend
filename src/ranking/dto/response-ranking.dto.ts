import { Expose } from "class-transformer";

export class ResponseRankingDto {
    @Expose()
    id!: number;

    @Expose()
    score!: number;

    @Expose()
    accuracy!: number;

    @Expose()
    position!: number;

    @Expose()
    roundId!: number;

    @Expose()
    userId!: number;
}
