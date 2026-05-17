import { Expose } from "class-transformer";

export class ResponseOptionDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'result' })
    result!: string;

    @Expose({ name: 'isCorrect' })
    isCorrect!: boolean;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;
}