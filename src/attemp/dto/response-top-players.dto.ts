import { Expose } from 'class-transformer';

export class ResponseTopPlayersDto {
  @Expose()
  userId!: number;

  @Expose()
  username!: string;

  @Expose()
  correct!: number;
}
