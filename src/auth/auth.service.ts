import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import { UsuarioRegisterRequestDto } from './dto/usuario-register-request.dto';
import { UsuarioLoginRequestDto } from './dto/usuario-login-request.dto';
import { RefreshTokenDto } from './dto/refresh-token-update.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user-dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}

    async register(registerDto: UsuarioRegisterRequestDto): Promise<ResponseUserDto> {
        const existingEmail = await this.userService.findByUsernameOrEmail(registerDto.email);
        if (existingEmail) {
            throw new ConflictException('El email o nombre de usuario ya está registrado');
        }

        const user = await this.userService.create(registerDto.username, registerDto.email, registerDto.password);

        return plainToInstance(ResponseUserDto, user);
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

        const token = await this.prismaService.refreshToken.create({
            data: {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
                userId: user.id,
                expiresOn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
            },
        });

        return plainToInstance(TokenResponseDto, token);
    }

    async patch(userId: number, patchUserDto: PatchUserDto): Promise<ResponseUserDto> {
        const currentUser = await this.userService.findById(userId);
        if (!currentUser) {
            throw new UnauthorizedException(['Usuario no encontrado']);
        }

        const updateData: Partial<Prisma.UserUpdateInput> = {};

        if (patchUserDto.email !== undefined && patchUserDto.email !== null && patchUserDto.email !== '') {
            if (patchUserDto.email.toLowerCase() !== currentUser.email.toLowerCase()) {
                const existingEmail = await this.prismaService.user.findFirst({
                    where: {
                        email: { mode: 'insensitive', equals: patchUserDto.email },
                        NOT: { id: userId }
                    }
                });

                if (existingEmail) {
                    throw new ConflictException(['El email ya está registrado']);
                }

                updateData.email = patchUserDto.email;
            }
        }

        if (patchUserDto.username !== undefined && patchUserDto.username !== null && patchUserDto.username !== '') {
            if (patchUserDto.username.toLowerCase() !== currentUser.username.toLowerCase()) {
                const existingUsername = await this.prismaService.user.findFirst({
                    where: {
                        username: { mode: 'insensitive', equals: patchUserDto.username },
                        NOT: { id: userId }
                    }
                });

                if (existingUsername) {
                    throw new ConflictException(['El nombre de usuario ya está registrado']);
                }

                updateData.username = patchUserDto.username;
            }
        }

        if (Object.keys(updateData).length === 0) {
            return plainToInstance(ResponseUserDto, currentUser);
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: updateData
        });

        return plainToInstance(ResponseUserDto, updatedUser);
    }

    async logout(userId: number, logoutUserDto: LogoutUserDto): Promise<void> {
        await this.prismaService.refreshToken.deleteMany({
            where: { 
                userId: userId,
                refreshToken: logoutUserDto.refreshToken,
                accessToken: logoutUserDto.accessToken 
            }
        });
    }

    async logoutAll(userId: number): Promise<void> {
        await this.prismaService.refreshToken.deleteMany({
            where: { userId }
        });
    }

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<ResponseUserDto> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new UnauthorizedException(['Usuario no encontrado']);
        }

        const isCurrentPasswordValid = await this.userService.validatePassword(
            changePasswordDto.currentPassword,
            user.password,
        );

        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException(['La contraseña actual es incorrecta']);
        }

        const isNewPasswordSameAsOld = await this.userService.validatePassword(
            changePasswordDto.newPassword,
            user.password,
        );

        if (isNewPasswordSameAsOld) {
            throw new ConflictException(['La nueva contraseña debe ser diferente de la actual']);
        }

        if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword) {
            throw new ConflictException(['La confirmación de contraseña no coincide']);
        }

        const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        this.logoutAll(userId);

        return plainToInstance(ResponseUserDto, updatedUser);
    }

}
