import { Router } from "express";
import { CategoryController } from "./categories-controller";
import { CategoryService } from "./categories-service";
import { CategoryRepository } from "./categories-repository";
import { categoryModel } from "./categories-model";
import { subCategoryModel } from "./sub-categories-model";

const router = Router();

const categoryRepo = new CategoryRepository(categoryModel, subCategoryModel);
const categoryService = new CategoryService(categoryRepo);
const controller = new CategoryController(categoryService);

router.get("/:id/subs", controller.getSubsByMainId);
router.get("/", controller.getAll);

export default router;