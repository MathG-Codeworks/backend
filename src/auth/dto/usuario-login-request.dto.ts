import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UsuarioLoginRequestDto {
	@IsString()
	@IsNotEmpty({ message: 'El usuario (nombre o email) es obligatorio' })
	usernameOrEmail!: string;

	@IsString()
	@IsNotEmpty({ message: 'La contraseña es obligatoria' })
	password!: string;
}
