import { Expose } from "class-transformer";

export class TokenResponseDto {
    @Expose({ name: 'refresh_token' })
    refresh_token: string;

    @Expose({ name: 'access_token' })
    access_token: string;
}
