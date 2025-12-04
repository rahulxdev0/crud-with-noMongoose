import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";


const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const SALT_ROUNDS = 10;

export const Register = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("users");
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(String(password), SALT_ROUNDS);

    const newUser = {
      name: name || null,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    };
    console.log(newUser);
    const result = await collection.insertOne(newUser);
    // delete password before sending response
    const { password: _, ...userWithoutPassword } = newUser;
    res
      .status(201)
      .json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ message: "Email already in use" });
    res.status(500).json({ error: error.message });
  }
};

export const Login = async (req, res) => {
  console.log("Login request body:", req.body);
  try {
    const db = getDB();
    const collection = db.collection("users");
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await collection.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
    console.log("User authenticated:", isValid);

    const payload = { sub: user._id.toString(), email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // remove password from user object before sending response
    const { password: _, ...userData } = user;
    res.status(200).json({ message: "Login successful", user: userData, token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
