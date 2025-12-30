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
    
}