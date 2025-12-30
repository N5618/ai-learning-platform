import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config()

export async function connectToDb() {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(uri);
        console.log(` MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error(`❌ Error: ${err instanceof Error ? err.message : err}`);
        process.exit(1);
    }
}

