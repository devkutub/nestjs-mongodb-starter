import { Body, Controller, Get, HttpStatus, Param, Patch, Put, Delete, Query, Res, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ISearchUser } from 'src/interface/user.interface';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Put()
    @UseGuards(AuthGuard)
    async createUser(@Res() response, @Req() request, @Body() user: CreateUserDto): Promise<User> {
        try {
            console.log(request.user);
            const result = await this.userService.createUser(user);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                data: result
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Res() response, @Param('id') userId: string, @Body() user: UpdateUserDto): Promise<User> {
        try {
            const result = await this.userService.updateUser(userId, user);
            return response.status(HttpStatus.OK).json({
                message: 'User has been updated successfully',
                data: result
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not updated!',
                error: 'Bad Request'
            });
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(@Res() response, @Param('id') userId: string): Promise<User> {
        try {
            const result = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User has been deleted successfully',
                data: result
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not deleted!',
                error: 'Bad Request'
            });
        }
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllUsers(@Res() response, @Query() search: ISearchUser) {
        try {
            search.from = Number(search.from);
            search.size = Number(search.size);
            const result = await this.userService.getAllUsers(search);
            return response.status(HttpStatus.OK).json({
                message: 'List of users',
                data: result
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Not able to fetch user list',
                error: 'Bad Request'
            });
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getAUsers(@Res() response, @Param('id') userId: string) {
        try {
            const result = await this.userService.getAUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User by Id',
                data: result
            });
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
}
