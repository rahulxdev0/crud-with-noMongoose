import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const collection = () => getDB().collection("users");

// Create User
export const createUser = async (req, res) => {
  try {
    const result = await collection().insertOne(req.body);
    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await collection().find().toArray();
    res.status(200).json({message: "Users retrieved successfully", users});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: error.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await collection().findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get user", error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


// Delete User
export const deleteUser = async (req, res) => {
  try {
    const result = await collection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};