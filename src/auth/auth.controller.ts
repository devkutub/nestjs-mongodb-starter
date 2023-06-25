import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('user')
    async logIn(@Res() response, @Body() auth: AuthUserDto) {
        try {
            const result = await this.authService.logIn(auth);
            return response.status(HttpStatus.OK).json({
                message: 'Logged In successfully',
                data: result
            });
        } catch (error) {
            return response.status(error.status || HttpStatus.BAD_REQUEST).json(error.response || {
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }
}
