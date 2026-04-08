import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty({ message: 'La contraseña actual es requerida' })
    currentPassword!: string;

    @IsString()
    @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
    @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)',
    })
    newPassword!: string;

    @IsString()
    @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
    confirmNewPassword!: string;
}
