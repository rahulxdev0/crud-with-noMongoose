import "./loadEnv.js";
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

await connectDB(); 

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);

// health
app.get("/", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 8000;

const startServer = async () => {
                
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
};

startServer();