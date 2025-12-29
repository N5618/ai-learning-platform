import mongoose, { Schema, Document } from "mongoose";


export interface IsubCategory {
    name: string;
    categoryId: Schema.Types.ObjectId;
}

const subCategorySchema = new Schema({
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category',required:true }
});

export default mongoose.model<IsubCategory>("SubCategory", subCategorySchema);

