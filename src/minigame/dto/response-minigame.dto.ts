import { Expose } from "class-transformer";

export class ResponseMinigameDto {
    @Expose({ name: 'id' })
    id!: string;

    @Expose({ name: 'name' })
    name!: string;

    @Expose({ name: 'description' })
    description!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;
}
