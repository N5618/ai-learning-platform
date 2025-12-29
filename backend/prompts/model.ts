import mongoose, { Schema, Document } from "mongoose";

export interface Iprompt extends Document {
    user_id: mongoose.Types.ObjectId;
    category_id: mongoose.Types.ObjectId;
    sub_category_id: mongoose.Types.ObjectId;
    prompt: string;
    response: string;
    created_at: Date;
}

const promptSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

export default mongoose.model<Iprompt>("Prompt", promptSchema);