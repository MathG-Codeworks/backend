import { Expose } from "class-transformer";

export class ResponseMatchDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'code' })
    code!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;
}
