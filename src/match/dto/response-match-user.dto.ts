import { Expose } from 'class-transformer';

export class ResponseMatchUserDto {
	@Expose()
	id!: number;

	@Expose()
	username!: string;
}
