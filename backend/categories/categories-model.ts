import mongoose from "mongoose";

export interface Icategory extends Document{
    id: string;
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

export default mongoose.model<Icategory>("Category", categorySchema);