import mongoose, { Schema, Types } from "mongoose";

export interface IsubCategory {
    name: string;
    category_id: Types.ObjectId; 
}

const subCategorySchema = new Schema<IsubCategory>({
    name: { type: String, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

export const subCategoryModel = mongoose.model<IsubCategory>("SubCategory", subCategorySchema);