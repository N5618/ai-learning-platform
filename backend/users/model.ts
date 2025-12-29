import mongoose from "mongoose";

export interface Iuser extends mongoose.Document {
    name: string;
    phone: string;
    password: string;
    role: string;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    phone: { type: String, required: [true, 'Phone is required'] },
    // password: {
    //     type: String,
    //     required: true
    // },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export default mongoose.model<Iuser>("User", userSchema);