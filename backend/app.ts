import express, { Express } from 'express';

const HOST = 'localhost';
const PORT = 5000;

export default class App {
    private app: Express;

    constructor() {
        this.app = express();
    }

    public init() {
        this.app.use(express.json)

        
        this.app.listen(PORT, HOST, () => {
            console.log(`Server running at http://${HOST}:${PORT}`);
        });
    }


}