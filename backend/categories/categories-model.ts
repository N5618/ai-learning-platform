import mongoose from "mongoose";

export interface Icategory extends Document{
    name:string;
}

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const categoryModel= mongoose.model<Icategory>("Category", categorySchema);