import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "mydb";

const client = new MongoClient(MONGO_URI);

let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log("Connected to MongoDB");

    // create collections / apply schema validators after connect
    try {
      const schemaModule = await import("../schema/userSchema.js");
      if (schemaModule && typeof schemaModule.createUserSchema === "function") {
        await schemaModule.createUserSchema();
      }
    } catch (err) {
      console.warn("Failed to create user schema:", err.message || err);
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export const getDB = () => db;
