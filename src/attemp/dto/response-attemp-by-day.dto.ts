import { Expose } from "class-transformer";

export class ResponseAttempByDayDto {
    @Expose()
	date!: string; // Formato YYYY-MM-DD
    
    @Expose()
	correct!: number;
	
    @Expose()
    incorrect!: number;

    @Expose()
	total!: number;
}
