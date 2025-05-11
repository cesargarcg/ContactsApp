import 'dotenv/config';
import { MongoClient } from "mongodb";

class Database {
    constructor() {
        const queryString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_SERVER}/?retryWrites=true&w=majority&appName=contacts`;
        this.client = new MongoClient(queryString);
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('contactsdb');
            console.log("Connected to database");
        } catch (e) {
            console.error("Error connecting to database", e);
        }
    }
}

export default new Database();