import { PromptRepository, } from "./prompts-repository";
import { CreatePromptDTO } from "./model"
import { CategoryRepository } from "../categories/categories-repository"
import { AiService } from "../common/ai-service";
import { Types } from "mongoose";


export class PromptService {
    constructor(private promptRepository: PromptRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly aiService: AiService
    ) { }

    async createLesson(dto: CreatePromptDTO) {
        const { userId, categoryId, subCategoryId, userQuestion } = dto;

        const category = await this.categoryRepository.findById(categoryId);
        const subCategory = await this.categoryRepository.findSubById(subCategoryId);

        //לזכור להחזיר אוביקט מסוג קטגוריה ואז זה לא יהיה אדום
        const categoryName = category?.name || "General";
        const subCategoryName = subCategory?.name || "General Topic";

        const prompt = `User: ${userQuestion}\nCategory: ${categoryName}\nSubcategory: ${subCategoryName}\nAI:`;

        const aiResponse = await this.aiService.generateResponse(prompt);

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
