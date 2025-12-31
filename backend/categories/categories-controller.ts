import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./categories-service";

export class CategoryController {
    constructor(private categoryService: CategoryService) {
        this.getSubsByMainId = this.getSubsByMainId.bind(this);
        this.getAll = this.getAll.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.createSubCategory = this.createSubCategory.bind(this);
    }


    async getSubsByMainId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const subs = await this.categoryService.findSubsByCategoryId(id);
           res.status(200).json({ 
            success: true, 
            data: subs 
        });
        } catch (error) {
            next(error)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.findAllCategories();
            res.status(200).json({ data: categories });
        } catch (error) {
            next(error)
        }
    }
    async createSubCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, categoryId } = req.body;
            const sub = await this.categoryService.createSubCategory(name, categoryId);
            res.status(201).json({ success: true, data: sub });
        } catch (error) {
            next(error);
        }
    };
    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const category = await this.categoryService.createCategory(name);
            res.status(201).json({ success: true, data: category });
        } catch (error) {
            next(error);
        }
    };

}