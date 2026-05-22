import { Expose } from 'class-transformer';

export class ResponseSessionTotalDto {
	@Expose({ name: 'total' })
	total!: number;
}