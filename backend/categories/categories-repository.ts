import { categoryModel } from "./categories-model";
import { Model } from "mongoose";
import { Icategory } from "./categories-model";

export class CategoryRepository{
    constructor(
        private readonly categoryModel: Model<Icategory> 
    ){}
    async findById(id: string) {
        // TODO: Implement findById method
        throw new Error("Method not implemented");
    }

    async findSubById(id: string) {
        // TODO: Implement findSubById method
        throw new Error("Method not implemented");
    }
}