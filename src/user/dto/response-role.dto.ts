import { Expose } from 'class-transformer';

export class ResponseRoleDto {
	@Expose({ name: 'id' })
	id!: number;

	@Expose({ name: 'name' })
	name!: string;
}