import { Request, Response } from "express";
import { CategoryService } from "./categories-service";

export class CategoryController{
    constructor(private categoryService:CategoryService){
          this.getSubsByMainId = this.getSubsByMainId.bind(this);
          this.getAll = this.getAll.bind(this);
    }
    
    
    async getSubsByMainId(req:Request,res:Response){
        try {
            const {id} = req.params;
            const subs = await this.categoryService.findSubsByCategoryId(id);
            res.status(200).json({data:subs});
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    }
    async getAll(req:Request, res:Response){
        try {
            const categories = await this.categoryService.findAllCategories();
            res.status(200).json({data:categories});
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    }

}