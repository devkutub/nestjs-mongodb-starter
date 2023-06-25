import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHERS = 'others'
}

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true, lowercase: true, message: "Email should be unique" })
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    gender: Gender;

    @Prop()
    dob: Date;

    @Prop()
    role: number;

    @Prop({ default: true })
    isEnabled: boolean;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);