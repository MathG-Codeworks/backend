import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty({ message: 'El token de refresco es obligatorio' })
    refreshToken!: string;

    @IsString()
    @IsNotEmpty({ message: 'El token de acceso es obligatorio' })
    accessToken!: string;

    @IsBoolean()
    @IsOptional()
    isFromGame?: boolean;
}
