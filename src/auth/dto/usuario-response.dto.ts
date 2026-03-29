import { Exclude } from 'class-transformer';

export class UsuarioResponseDto {
  id: number;
  username: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;
}
