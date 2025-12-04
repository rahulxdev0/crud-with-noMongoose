import { getDB } from "../config/db.js";

const collection = getDB().collection("users");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const SALT_ROUNDS = 10

export const Register = async (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }

}

export const Login = async (req, res) => {
    const { email, password } = req.body;
}