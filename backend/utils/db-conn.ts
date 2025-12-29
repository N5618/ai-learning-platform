import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export async function connetToDb(){
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    }
    catch(err){
       console.error(`❌ Error: ${err instanceof Error ? err.message : err}`);
        process.exit(1);
    }
}
    
