import { Expose, Type } from "class-transformer";
import { ResponseMinigameDto } from "src/minigame/dto/response-minigame.dto";

export class ResponseRoundDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Type(() => ResponseMinigameDto)
    @Expose()
    minigame!: ResponseMinigameDto;
}
