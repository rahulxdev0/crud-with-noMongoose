import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
console.log(`Environment Port: ${PORT}`);

const startServer = async () => {
  await connectDB();               
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
};

startServer();