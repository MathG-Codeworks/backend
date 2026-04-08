import { IsString, IsNotEmpty } from 'class-validator';

export class LogoutUserDto {
    @IsString()
    @IsNotEmpty({ message: 'El token de refresco es obligatorio' })
    refreshToken!: string;

    @IsString()
    @IsNotEmpty({ message: 'El token de acceso es obligatorio' })
    accessToken!: string;
}
