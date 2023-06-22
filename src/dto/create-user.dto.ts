import { IsString, IsNotEmpty, MinLength, IsEmail, Length, IsDate, Allow, IsInt, IsBoolean } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 16)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @IsString()
    @Length(10)
    readonly phone: string;

    @IsDate()
    readonly dob: Date;

    @Allow({ groups: ['male', 'female', 'others'] })
    readonly gender: string;

    @IsInt()
    readonly role: number;

    @IsBoolean()
    readonly isEnabled: boolean = true;

    @IsBoolean()
    readonly isDeleted: boolean = false;
}