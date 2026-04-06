import { Expose } from "class-transformer";

export class TokenResponseDto {
    @Expose({ name: 'refreshToken' })
    refreshToken!: string;

    @Expose({ name: 'accessToken' })
    accessToken!: string;
}
