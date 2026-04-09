import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private readonly prismaService: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException(['Token no proporcionado']);
        }
        
        try {
            const payload = await this.jwtService.verifyAsync(token);

            const refreshTokenRecord = await this.prismaService.refreshToken.findFirst({
                where: {
                    accessToken: token,
                    userId: payload.sub,
                    expiresOn: { gt: new Date() },
                },
            });

            if (!refreshTokenRecord) {
                throw new UnauthorizedException(['Token revocado o expirado']);
            }

            const user = await this.userService.findById(payload.sub);
            request['user'] = user;
        } catch {
            throw new UnauthorizedException(['Token inválido']);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const prefix = process.env.JWT_PREFIX || 'Bearer';
        return type === prefix ? token : undefined;
    }
}
