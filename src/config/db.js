import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017")

let db;

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db("crud_app");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}

export const getDB = () => db;