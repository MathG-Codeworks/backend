import { Expose } from 'class-transformer';

export class ResponseMatchSummaryDto {
	@Expose()
	id!: string;

	@Expose()
	code!: string;

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;

	@Expose()
	roundsCount!: number;

	@Expose()
	playersCount!: number;
}
