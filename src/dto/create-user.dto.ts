import { IsString, IsNotEmpty, MinLength, IsEmail, Length, IsDateString, Allow, IsInt, IsBoolean } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
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

    @IsDateString()
    readonly dob: Date;

    // @Allow({ groups: ['male', 'female', 'others'] })
    @IsString()
    @IsNotEmpty()
    readonly gender: string;

    @IsInt()
    readonly role: number;

    @IsBoolean()
    readonly isEnabled: boolean = true;

    @IsBoolean()
    readonly isDeleted: boolean = false;
}