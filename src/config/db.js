import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "mydb";

const client = new MongoClient(MONGO_URI);

let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(DB_NAME);

    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export const getDB = () => db;
