import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middlweares/error-handler';
import userRouter from './users/users-routes';
import promptRouter from "./prompts/prompts-routes"
import categoryRouter from "./categories/category-routes"
import { connectToDb } from './utils/db-conn';

const HOST = 'localhost';
const PORT = 5000;

export default class App {
    private app: Express;

    constructor() {
        this.app = express();
    }

    public async init() {

        await connectToDb()
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use('/api/users', userRouter);
        this.app.use('/api/prompts', promptRouter);
        this.app.use('/api/categories', categoryRouter);

        this.app.use((req, res) => {
            res.status(404).json({
                success: false,
                message: `Route ${req.originalUrl} not found - check your URL or Method`
            });
        });

        this.app.use(errorHandler);


        this.app.listen(PORT, HOST, () => {
            console.log(`Server running at http://${HOST}:${PORT}`);
        });
    }


}