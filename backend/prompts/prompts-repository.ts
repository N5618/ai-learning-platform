import { Model, Types } from "mongoose";
import { IPrompt } from "./model";

export class PromptRepository {
    constructor(private readonly promptModel: Model<IPrompt>) { }

    async create(promptData: Partial<IPrompt>): Promise<IPrompt> {
        return await this.promptModel.create(promptData);
    }

    async getHistoryByUserId(userId: string): Promise<IPrompt[]> {
        console.log("Looking for history for user:", userId)
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error("INVALID_USER_ID");
        }
        return await this.promptModel.
            find({ user_id: new Types.ObjectId(userId) })
            .sort({ created_at: -1 })
            .populate('category_id', 'name')
            .populate('sub_category_id', 'name')
            .exec();
    }

    async getAll(page: number = 1, limit: number = 1000, search: string = "") {
        console.log("Fetching all prompts for Admin...");

        const skip = (page - 1) * limit;


        const query = search ? { prompt: { $regex: search, $options: "i" } } : {};

        const [data, total] = await Promise.all([
            this.promptModel.find(query)
                .populate("user_id", "name")
                .populate("category_id", "name")
                .populate("sub_category_id", "name")
                .sort({ created_at: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.promptModel.countDocuments(query)
        ]);

        return { data, total };
    }
}