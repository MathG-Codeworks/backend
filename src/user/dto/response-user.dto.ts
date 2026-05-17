import { Expose, Type } from 'class-transformer';
import { ResponseRoleDto } from 'src/user/dto/response-role.dto';

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

    @Expose({ name: 'roleId' })
    roleId!: number;

    @Type(() => ResponseRoleDto)
    @Expose({ name: 'role' })
    role!: ResponseRoleDto;
}
