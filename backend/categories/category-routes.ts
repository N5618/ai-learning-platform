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

router.get("/", controller.getAll);
router.post("/", controller.createCategory);
router.get("/:id/subs", controller.getSubsByMainId);
router.post("/sub", controller.createSubCategory);

export default router;