import { getDB } from "../config/db.js";

export const createUserSchema = async () => {
  const db = getDB();
  if (!db) throw new Error("Database not initialized");

  // only create the collection if it doesn't already exist
  const existing = await db.listCollections({ name: "users" }).toArray();
  if (existing.length > 0) {
    console.log("'users' collection already exists — skipping creation");
    return;
  }


  const emailPattern = "^(?!\\.)(?!.*\\.\\.)[a-z0-9_+'\\-\\.]*[a-z0-9_+\\-]@([a-z0-9][a-z0-9\\-]*\\.)+[a-z]{2,}$";

  await db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            bsonType: "string",
            description: "Name must be a string"
          },
          email: {
            bsonType: "string",
            pattern: emailPattern,
            description: "Must be a valid email"
          },
          password: {
            bsonType: "string",
            minLength: 6,
            description: "Password must be at least 6 characters"
          }
        }
      }
    },
    validationLevel: "strict"
  });

  console.log("User schema created!");
};
