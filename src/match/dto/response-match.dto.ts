import { Expose, Type } from "class-transformer";
import { ResponseRoundDto } from "src/round/dto/response-round.dto";

export class ResponseMatchDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'code' })
    code!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Type(() => ResponseRoundDto)
    @Expose()
    rounds!: ResponseRoundDto[];
}
