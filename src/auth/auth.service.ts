import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { Prisma, User } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import { UsuarioRegisterRequestDto } from './dto/usuario-register-request.dto';
import { UsuarioLoginRequestDto } from './dto/usuario-login-request.dto';
import { RefreshTokenDto } from './dto/refresh-token-update.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}

    async register(registerDto: UsuarioRegisterRequestDto) {
        const existingUser = await this.userService.findOne(registerDto.username);
        if (existingUser) {
            throw new ConflictException('El nombre de usuario ya existe');
        }

        const existingEmail = await this.userService.findByUsernameOrEmail(registerDto.email);
        if (existingEmail) {
            throw new ConflictException('El email ya está registrado');
        }

        await this.userService.create(registerDto.username, registerDto.email, registerDto.password);

        return {
            message: 'Usuario registrado exitosamente',
        };
    }

    async login(loginDto: UsuarioLoginRequestDto): Promise<TokenResponseDto> {
        const user = await this.userService.findByUsernameOrEmail(loginDto.usernameOrEmail);
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

        const newTokens = await this.generateRefreshToken(user);
        return newTokens;
    }

    async refresh(refreshTokenDto: RefreshTokenDto): Promise<TokenResponseDto> {
        const refreshToken = await this.prismaService.refreshToken.findFirst({
            where: { 
                refreshToken: refreshTokenDto.refreshToken,
                accessToken: refreshTokenDto.accessToken,
                expiresOn: { gt: new Date() }
            },
            include: { user: true }
        });

        if (!refreshToken) {
            throw new UnauthorizedException('Token de refresco inválido o expirado');
        }

        const newTokens = await this.generateRefreshToken(refreshToken.user);

        await this.prismaService.refreshToken.delete({
            where: { id: refreshToken.id }
        });

        return newTokens;
    }

    async generateRefreshToken(user: User): Promise<TokenResponseDto> {
        const payload = { sub: user.id, username: user.username };
        const newAccessToken = await this.jwtService.signAsync(payload);
        const newRefreshToken = randomBytes(32).toString('hex');

        await this.prismaService.refreshToken.create({
            data: {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
                userId: user.id,
                expiresOn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
            },
        });

        return {
            refresh_token: newRefreshToken,
            access_token: newAccessToken,
        };
    }

}

