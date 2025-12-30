import OpenAI from "openai";

export class AiService {
    private openai: OpenAI

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateLesson(category: string, subCategory: string, prompt: string):Promise<string> {
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

    
    await new Promise(resolve => setTimeout(resolve, 1500));

    return `זאת תשובת דמי (Mock):
    ביקשת ללמוד על ${subCategory} בתחום ה${category}.
    השאלה שלך הייתה: "${prompt}".
    
    הסבר קצר: זהו תוכן גנרי שנוצר על ידי ה-MockService מכיוון שה-API כרגע לא פעיל. 
    ברגע שנחבר את OpenAI, כאן תופיע תשובה אינטליגנטית מהמודל.`;
    }
} 
    
