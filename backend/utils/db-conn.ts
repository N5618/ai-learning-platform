import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserModel} from "../users/model"
import {categoryModel} from "../categories/categories-model"
import {subCategoryModel} from "../categories/sub-categories-model"


dotenv.config()

export async function connectToDb() {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(uri);
        console.log(` MongoDB Connected: ${conn.connection.host}`);

        await seedDatabase();
    }
    catch (err) {
        console.error(`❌ Error: ${err instanceof Error ? err.message : err}`);
        process.exit(1);
    }
}


export async function seedDatabase() {
    try {
    
        const adminExists = await UserModel.findOne({ phone: "0548545618" });
        if (!adminExists) {
            await UserModel.create({
                name: "Neechami",
                phone: "0548545618",
                role: "admin" 
            });
            console.log("Admin user created successfully.");
        }

        
        const categoryCount = await categoryModel.countDocuments();
        if (categoryCount === 0) {
            const science = await categoryModel.create({ name: "Science" });
            const history = await categoryModel.create({ name: "History" });

            await subCategoryModel.insertMany([
                { name: "Space", category_id: science._id },
                { name: "Biology", category_id: science._id },
                { name: "Ancient Rome", category_id: history._id }
            ]);
            console.log("Categories and Sub-categories seeded successfully.");
        }
    } catch (error) {
        console.error("❌ Seeding error:", error);
    }
}

    



