import { PromptRepository, } from "./prompts-repository";
import { CreatePromptDTO } from "./model"
import { CategoryService } from "../categories/categories-service"
import { AiService } from "../AI/ai-service";
import { Types } from "mongoose";


export class PromptService {
    constructor(private promptRepository: PromptRepository,
        private readonly categoryService: CategoryService,
        private readonly aiService: AiService
    ) { }

    async createLesson(dto: CreatePromptDTO) {
        const { userId, categoryId, subCategoryId, userQuestion } = dto;

        const category = await this.categoryService.findById(categoryId);
        const subCategory = await this.categoryService.findSubById(subCategoryId);

      
        const categoryName = category?.name || "General";
        const subCategoryName = subCategory?.name || "General Topic";

        const aiResponse = await this.aiService.generateLesson(
            categoryName,
            subCategoryName,
            dto.userQuestion
        );



        return await this.promptRepository.create({
            user_id: new Types.ObjectId(userId),
            category_id: new Types.ObjectId(categoryId),
            sub_category_id: new Types.ObjectId(subCategoryId),
            prompt: userQuestion,
            response: aiResponse
        });


    }
    async getUserHistoryById(userId: string) {
        return await this.promptRepository.getHistoryByUserId(userId);
    }

    async getAll() {
        return await this.promptRepository.getAll();
    }
}
