import { IsString, IsNotEmpty, MinLength, IsEmail, Length, IsDateString, Allow, IsInt, IsBoolean, IsEnum } from "class-validator";
import { Gender } from "src/schema/user.schema";

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

    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender: Gender;

    @IsInt()
    @IsEnum({ SUPER_ADMIN: 0, CUSTOMER: 1 })
    readonly role: number;

    @IsBoolean()
    readonly isEnabled: boolean = true;

    @IsBoolean()
    readonly isDeleted: boolean = false;
}