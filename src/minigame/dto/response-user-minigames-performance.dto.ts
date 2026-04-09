import { Expose } from "class-transformer";

export class ResponseUserMinigamesPerformanceDto {
	@Expose()
	id!: number;

	@Expose()
	name!: string;
	
	@Expose()
	description!: string;
	
	@Expose()
	category!: string;
	
	@Expose()
	rounds!: number;
	
	@Expose()
	score!: number;

	@Expose()
	accuracy!: number;

	@Expose()
	position!: number;
}
