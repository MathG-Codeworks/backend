import { Expose } from "class-transformer";

export class ResponseSessionDto {
    @Expose({ name: 'id' })
    id!: number;

    @Expose({ name: 'start' })
    start!: Date;

    @Expose({ name: 'end' })
    end!: Date;

    @Expose({ name: 'platform' })
    platform!: string;

    @Expose({ name: 'device' })
    device!: string;
}
