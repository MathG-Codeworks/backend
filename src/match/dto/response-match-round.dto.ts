import { Expose, Type } from 'class-transformer';
import { ResponseMatchRoundRankingDto } from './response-match-round-ranking.dto';

export class ResponseMatchRoundDto {
	@Expose()
	id!: number;

	@Expose()
	minigameId!: number;

	@Expose()
	minigameName!: string;

	@Expose()
	minigameDescription!: string;

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;

	@Type(() => ResponseMatchRoundRankingDto)
	@Expose()
	rankings!: ResponseMatchRoundRankingDto[];
}
