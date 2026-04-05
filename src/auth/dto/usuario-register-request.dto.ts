import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class UsuarioRegisterRequestDto {
	@IsString()
	@IsNotEmpty({ message: 'El nombre es obligatorio' })
	@MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
	@MaxLength(20, { message: 'El nombre no puede exceder 20 caracteres' })
	@Matches(/^[a-zA-Z0-9_]+$/, {
		message: 'El nombre solo puede contener letras, números y guiones bajos',
	})
	username!: string;

	@IsEmail({}, { message: 'El email debe ser válido' })
	@IsNotEmpty({ message: 'El email es obligatorio' })
	email!: string;

	@IsString()
	@IsNotEmpty({ message: 'La contraseña es obligatoria' })
	@MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
	@MaxLength(20, { message: 'La contraseña no puede exceder 20 caracteres' })
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		{
			message:
				'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)',
		},
	)
	password!: string;
}
