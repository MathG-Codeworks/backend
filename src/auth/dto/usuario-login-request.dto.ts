import { IsString, IsNotEmpty } from 'class-validator';

export class UsuarioLoginRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
