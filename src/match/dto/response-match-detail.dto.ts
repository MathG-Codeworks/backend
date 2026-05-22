import { Expose, Type } from 'class-transformer';
import { ResponseMatchRoundDto } from './response-match-round.dto';
import { ResponseMatchUserDto } from './response-match-user.dto';

export class ResponseMatchDetailDto {
	@Expose()
	id!: string;

	@Expose()
	code!: string;

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;

	@Type(() => ResponseMatchUserDto)
	@Expose()
	users!: ResponseMatchUserDto[];

	@Type(() => ResponseMatchRoundDto)
	@Expose()
	rounds!: ResponseMatchRoundDto[];
}
