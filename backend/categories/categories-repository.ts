import { Model, Types } from "mongoose";
import { Icategory } from "./categories-model";
import { IsubCategory } from "./sub-categories-model";

export class CategoryRepository {
    constructor(
        private readonly categoryModel: Model<Icategory>,
        private readonly subCategoryModel: Model<IsubCategory>
    ) { }


    async findAllCategories(): Promise<Icategory[]> {
        return await this.categoryModel.find();
    }


    async findSubsByCategoryId(categoryId: string): Promise<IsubCategory[]> {
        const id = new Types.ObjectId(categoryId);
        return await this.subCategoryModel.find({ category_id: id }).exec();
    }


    async findById(id: string): Promise<Icategory | null> {
        return await this.categoryModel.findById(id);
    }


    async findSubById(id: string): Promise<IsubCategory | null> {
        return await this.subCategoryModel.findById(id);
    }
}