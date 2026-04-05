import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsuarioRegisterRequestDto } from './dto/usuario-register-request.dto';
import { UsuarioLoginRequestDto } from './dto/usuario-login-request.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { RefreshTokenDto } from './dto/refresh-token-update.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() registerDto: UsuarioRegisterRequestDto) {
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
    getProfile(@Request() req: ExpressRequest): UsuarioResponseDto {
        const user = (req as any).user;
        return {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as UsuarioResponseDto;
    }
}
