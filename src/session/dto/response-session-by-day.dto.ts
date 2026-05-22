import { Expose } from 'class-transformer';

export class ResponseSessionByDayDto {
	@Expose({ name: 'date' })
	date!: string;

	@Expose({ name: 'count' })
	count!: number;
}