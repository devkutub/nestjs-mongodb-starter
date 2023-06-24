import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { ISearchUser } from 'src/interface/user.interface';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(user: CreateUserDto): Promise<User> {
        const result = await this.userModel.create(user);
        return result;
    }
    async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
        const isValid = mongoose.isValidObjectId(userId);
        if (!isValid) throw new BadRequestException('Please send valid userId');
        const result = await this.userModel.findByIdAndUpdate(userId, user, { $new: true });
        if (result == null) throw new NotFoundException(`User not found with Id ${userId}`);
        return result;
    }
    async deleteUser(userId: string): Promise<User> {
        const isValid = mongoose.isValidObjectId(userId);
        if (!isValid) throw new BadRequestException('Please send valid userId');
        const result = await this.userModel.findByIdAndUpdate(userId, { $set: { isDeleted: true } }, { $new: true });
        if (result == null) throw new NotFoundException(`User not found with Id ${userId}`);
        return result;
    }
    async getAllUsers(search: ISearchUser): Promise<{ users: User[], totalCount: number }> {
        const query = { isDeleted: { $ne: true } };
        if (search.search) {
            query["$or"] = [
                { name: { $regex: `.*${search.search}.*`, $options: "i" } },
                { email: { $regex: `.*${search.search}.*`, $options: "i" } },
                { phone: { $regex: `.*${search.search}.*`, $options: "i" } }
            ];
        }
        const result = await this.userModel.find(query).skip(search.from).limit(search.size);
        const count = await this.userModel.countDocuments(query);
        return { users: result, totalCount: count };
    }
    async getAUser(userId: string): Promise<User> {
        const isValid = mongoose.isValidObjectId(userId);
        if (!isValid) throw new BadRequestException('Please send valid userId');
        const result = await this.userModel.findById(userId);
        if (result == null) throw new NotFoundException(`User not found with Id ${userId}`);
        return result;
    }
}
