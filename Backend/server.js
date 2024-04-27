import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import axios from 'axios';
import path from 'path';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5002;

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser Middleware
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, 'vite-project', 'dist')));

  // Fallback route for React SPA
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'vite-project', 'dist', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
