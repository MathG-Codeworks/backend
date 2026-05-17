import { Expose, Type } from "class-transformer";
import { ResponseOptionDto } from "src/option/dto/response-option.dto";

export class ResponseStepDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'description' })
    description!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Type(() => ResponseOptionDto)
    @Expose({ name: 'options' })
    options!: ResponseOptionDto[];
}