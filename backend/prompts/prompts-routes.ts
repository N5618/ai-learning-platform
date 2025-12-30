import { Router } from "express";
import { PromptController } from "./prompts-controller";
import { PromptService } from "./prompts-service";
import { PromptRepository } from "./prompts-repository";
import { PromptModel } from "./model"; 
import { CategoryRepository } from "../categories/categories-repository";
import { categoryModel } from "../categories/categories-model";
import { subCategoryModel } from "../categories/sub-categories-model";
import { AiService } from "../AI/ai-service";
import { CategoryService } from "../categories/categories-service";
import { validatePrompt ,validateUserId} from "../middlweares/validaition-midd";
import { isAdmin } from "../middlweares/auth-middleware";

const router = Router();


const promptRepo = new PromptRepository(PromptModel);
const categoryRepo = new CategoryRepository(categoryModel, subCategoryModel);
const categoryService = new CategoryService(categoryRepo);
const aiService = new AiService();
const promptService = new PromptService(promptRepo, categoryService, aiService);
const promptController = new PromptController(promptService);

 
router.post("/generate",validateUserId,validatePrompt, promptController.createLesson);
router.get("/history/:userId",validateUserId,promptController.getUserHistoryById);
router.get("/admin/all",isAdmin, promptController.getAll);



export default router;
