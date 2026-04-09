import { Expose } from "class-transformer";

export class ResponseUserAttempsPresitionDto {
    @Expose()
    total!: number;

    @Expose()
    correct!: number;

    @Expose()
    incorrect!: number;

    @Expose()
    presition!: number;
}