import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { User } from 'src/schema/user.schema';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name)
    private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async logIn(auth: AuthUserDto): Promise<{ token: string }> {
        let user = await this.userModel.findOne({ email: auth.email });
        if (!user) throw new NotFoundException(`No account found for ${auth.email}`);

        user = user.toObject();

        if (user.isDeleted) throw new BadRequestException("Your account has been marked for deletion");

        if (!user.isEnabled) throw new BadRequestException("Your account has been disabled. Please contact administrator");

        // verify password
        const isMatch = bcrypt.compareSync(auth.password, user.password);
        if (!isMatch) throw new UnauthorizedException("Password doesn't match");

        // refractor the data to extract password from it
        const { password, ...otherUserData } = user;

        // generate jwt token and sends back...  which can be use later to identify authorized user
        const token = this.jwtService.sign(otherUserData);

        return { token };
    }
}
