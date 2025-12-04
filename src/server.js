import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import userRoutes from './routes/user.routes.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();               
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
};

startServer();