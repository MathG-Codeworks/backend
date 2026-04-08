import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, Get, Request, Patch } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsuarioRegisterRequestDto } from './dto/usuario-register-request.dto';
import { UsuarioLoginRequestDto } from './dto/usuario-login-request.dto';
import { RefreshTokenDto } from './dto/refresh-token-update.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { ResponseUserDto } from './dto/response-user-dto';
import { plainToInstance } from 'class-transformer';
import { PatchUserDto } from './dto/patch-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

interface AuthenticatedUser {
  	id: number;
	username: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() registerDto: UsuarioRegisterRequestDto): Promise<ResponseUserDto> {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: UsuarioLoginRequestDto): Promise<TokenResponseDto> {
        return this.authService.login(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponseDto> {
        return this.authService.refresh(refreshTokenDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: ExpressRequest): ResponseUserDto {
        const user = (req as any).user;
        return plainToInstance(ResponseUserDto, user);
    }

    @UseGuards(AuthGuard)
    @Patch('profile')
    patch(
        @Request() req: ExpressRequest,
        @Body() patchUserDto: PatchUserDto
    ) : Promise<ResponseUserDto> {
        const user = (req as any).user as AuthenticatedUser;
        return this.authService.patch(user.id, patchUserDto);
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    logout(
        @Request() req: ExpressRequest,
        @Body() logoutUserDto: LogoutUserDto
    ): Promise<void> {
        const user = (req as any).user as AuthenticatedUser;
        return this.authService.logout(user.id, logoutUserDto);
    }

    @UseGuards(AuthGuard)
    @Post('logout-all')
    logoutAll(@Request() req: ExpressRequest): Promise<void> {
        const user = (req as any).user as AuthenticatedUser;
        return this.authService.logoutAll(user.id);
    }

    @UseGuards(AuthGuard)
    @Patch('change-password')
    changePassword(
        @Request() req: ExpressRequest,
        @Body() changePasswordDto: ChangePasswordDto
    ): Promise<ResponseUserDto> {
        const user = (req as any).user as AuthenticatedUser;
        return this.authService.changePassword(user.id, changePasswordDto);
    }
}
