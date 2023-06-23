import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    dob: Date;
    gender: string;
    role: number;
    isEnabled: boolean;
    isDeleted: boolean;
}

export interface ISearchUser {
    from: number;
    size: number;
    search?: string
}