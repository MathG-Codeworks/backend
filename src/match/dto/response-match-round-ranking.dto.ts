import { Expose } from 'class-transformer';

export class ResponseMatchRoundRankingDto {
	@Expose()
	id!: number;

	@Expose()
	userId!: number;

	@Expose()
	username!: string;

	@Expose()
	score!: number;

	@Expose()
	accuracy!: number;

	@Expose()
	position!: number;
}
