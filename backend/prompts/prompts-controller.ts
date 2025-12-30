import { Request, Response, NextFunction } from "express";
import { PromptService } from "./prompts-service";
import { CreatePromptDTO } from "./model";

export class PromptController {
    constructor(private readonly promptService: PromptService) {
        this.createLesson = this.createLesson.bind(this);
        this.getUserHistoryById = this.getUserHistoryById.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async createLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto: CreatePromptDTO = req.body;


            const lesson = await this.promptService.createLesson(dto);

            res.status(201).json({
                success: true,
                message: "Lesson generated successfully",
                data: lesson
            });

        } catch (error: any) {
            next(error);
        }
    }

    async getUserHistoryById(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const { userId } = req.params;

            if (!userId) {
                res.status(400).json({ success: false, message: "User ID is required" });
                return;
            }

            const history = await this.promptService.getUserHistoryById(userId);

            res.status(201).json({
                success: true,
                count: history.length,
                data: history
            });

        } catch (error: any) {
          next(error)
        }
    }

    async getAll(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const allPrompts = await this.promptService.getAll();
            res.status(200).json({
                success: true,
                data: allPrompts
            });
        } catch (error: any) {
           next(error);
        }
    }
}