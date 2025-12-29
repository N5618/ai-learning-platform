import mongoose from "mongoose";

export interface Icategory extends Document{
    name:string;
}

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export const categoryModel= mongoose.model<Icategory>("Category", categorySchema);