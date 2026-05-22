import { Expose } from 'class-transformer';

export class ResponseUserTotalDto {
	@Expose({ name: 'total' })
	total!: number;
}