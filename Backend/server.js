import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import axios from 'axios';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5002;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser Middleware
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

app.post("/sso/token", async (req, res) => {
  try {
    const endpointURL = "https://stagingaccount.xoxoday.com/chef/v1/oauth/sso/stores/company";

    const requestBody = {
      user_input: req.body.user_input,
      tpd: {
        auth_header: `Bearer ${BEARER_TOKEN}`,
        employee_id: req.body.employee_id,
        Uid: req.body.Uid
      }
    };

    const headers = {
      Authorization: 'Bearer ' + req.headers.authorization,
      'Content-Type': 'application/json'
    };

    const response = await axios.post(endpointURL, requestBody, { headers });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/vite-project/dist')));

  app.get('*',(req,res) =>
res.sendFile(path.resolve(__dirname, '/vite-project', 'dist', 'index.html')))
}
else{
  app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
