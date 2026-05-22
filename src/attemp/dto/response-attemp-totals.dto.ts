import { Expose } from 'class-transformer';

export class ResponseAttempTotalsDto {
  @Expose()
  total!: number;

  @Expose()
  correct!: number;

  @Expose()
  incorrect!: number;
}
