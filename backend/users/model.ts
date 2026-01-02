import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    phone: string;
    password: string;
    role: string;
}

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    phone: { type: String, required: [true, 'Phone is required'], unique: true },
    // password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export const UserModel = model<IUser>("User", userSchema)