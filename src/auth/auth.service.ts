import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UsuarioRegisterRequestDto } from './dto/usuario-register-request.dto';
import { UsuarioLoginRequestDto } from './dto/usuario-login-request.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: UsuarioRegisterRequestDto) {
        const existingUser = await this.userService.findOne(registerDto.username);
        if (existingUser) {
            throw new ConflictException('El usuario ya existe');
        }

        await this.userService.create(registerDto.username, registerDto.password);

        return {
            message: 'Usuario registrado exitosamente',
        };
    }

    async login(loginDto: UsuarioLoginRequestDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await this.userService.validatePassword(
            loginDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

