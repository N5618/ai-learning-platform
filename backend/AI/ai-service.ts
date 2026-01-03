import OpenAI from "openai";

export class AiService {
    private openai: OpenAI;

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;

        
        if (!apiKey) {
            
            console.warn("⚠️ Warning: OPENAI_API_KEY is missing. AI features will fail.");
            
        }

        this.openai = new OpenAI({
            apiKey: apiKey || 'missing-key',
        });
    }

    async generateLesson(category: string, subCategory: string, prompt: string): Promise<string> {
        if (process.env.OPENAI_API_KEY === undefined || process.env.OPENAI_API_KEY === '') {
            return this.getMockResponse(category, subCategory, prompt);
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful teaching assistant. 
                                  The student wants to learn about ${subCategory} in the field of ${category}. 
                                  Provide a clear, engaging, and educational explanation in Hebrew.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
            });

            return response.choices[0].message?.content || "מצטער, לא הצלחתי לייצר תוכן כרגע.";

        } catch (error: any) {
            console.error("OpenAI API Error:", error.message);
            throw new Error("נכשלה התקשורת עם שירות ה-AI. אנא נסה שוב מאוחר יותר.");
            
        }
    }

   
    async  getMockResponse(category: string, subCategory: string, prompt: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        return `זאת תשובת דמי (Mock):
        ביקשת ללמוד על ${subCategory} בתחום ה${category}.
        השאלה שלך הייתה: "${prompt}".
        
        הסבר: המערכת פועלת כרגע במצב Mock כי לא הוגדר OPENAI_API_KEY בקובץ ה-env.`;
    }
}