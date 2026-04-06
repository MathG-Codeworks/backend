import { Expose } from "class-transformer";

export class ResponseUserDto {
    
    @Expose({ name: 'id' })
    id!: number;

    @Expose({ name: 'username' })
    username!: string;

    @Expose({ name: 'email' })
    email!: string;
    
    @Expose({ name: 'createdAt' })
    createdAt!: Date;

    @Expose({ name: 'updatedAt' })
    updatedAt!: Date;
}
