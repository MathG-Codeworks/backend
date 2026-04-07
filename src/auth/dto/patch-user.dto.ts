import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsEmail, IsOptional } from 'class-validator';

export class PatchUserDto {
	@IsString()
    @IsOptional()
	@MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
	@MaxLength(20, { message: 'El nombre no puede exceder 20 caracteres' })
	@Matches(/^[a-zA-Z0-9_]+$/, {
		message: 'El nombre solo puede contener letras, números y guiones bajos',
	})
	username!: string;

	@IsEmail({}, { message: 'El email debe ser válido' })
    @IsOptional()
	email!: string;
}
