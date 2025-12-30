import { CategoryRepository } from "./categories-repository";

export class CategoryService{
    constructor(private categoryRepository:CategoryRepository){

    }
    async findAllCategories(){
        return await this.categoryRepository.findAllCategories();
    }
    async findSubsByCategoryId(categoryId:string){
        return await this.categoryRepository.findSubsByCategoryId(categoryId);
    }
    async findSubById(subCategoryId:string){
        return await this.categoryRepository.findSubById(subCategoryId);
    }
    async findById(id:string){
        return await this.categoryRepository.findById(id);
    }
    async findByName(name:string){
        return await this.categoryRepository.findCategoryByName(name);
    }
    async createCategory(name:string){
        const existing = await this.categoryRepository.findCategoryByName(name);
        if (existing) {
            throw new Error("Category already exists");
        }
        return await this.categoryRepository.createCategory(name);
    }
    async createSubCategory(name:string,categoryId:string){
       const parent = await this.categoryRepository.findById(categoryId);
        if (!parent) {
            throw new Error("Parent category not found");
        }
        return await this.categoryRepository.createSubCategory(name, categoryId);
    }
    
}