import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty({ message: 'La plataforma es obligatoria' })
	platform!: string;

	@IsString()
	@IsNotEmpty({ message: 'El dispositivo es obligatorio' })
	device!: string;
}
