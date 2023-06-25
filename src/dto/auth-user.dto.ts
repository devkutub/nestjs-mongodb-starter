import { IsString, MinLength, IsEmail } from "class-validator";

export class AuthUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    readonly password: string;
}