import { Expose, Type } from "class-transformer";
import { ResponseStepDto } from "src/step/dto/response-step.dto";

export class ResponseExcerciseDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'operation' })
    operation!: string;

    @Expose({ name: 'description' })
    description!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Type(() => ResponseStepDto)
    @Expose({ name: 'steps' })
    steps!: ResponseStepDto[];
}