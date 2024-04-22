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
    // Define the endpoint URL
    const endpointURL = "https://stagingaccount.xoxoday.com/chef/v1/oauth/sso/stores/company";

    // Define the request body
    const requestBody = {
      user_input: "email@example.com",
      tpd: {
        auth_header: "Bearer asdgfjhbsdlkjbasdlkjbadslkbdakasdhfjhfdb==",
        employee_id: "4356XC90",
        Uid: "TTEO32S99ERCL"
      }
    };

    // Define the request headers
    const headers = {
      Authorization: 'Bearer eyJ0b2tlbkNvbnRlbnQiOnsiaXNzdWVkRm9yIjoiRnJlc2h3b3JrcyIsInNjb3BlIjoiIiwiaXNzdWVkQXQiOjE1NTk5MTk4ODE2MDEsImV4cGlyZXNBdCI6IjIwMTktMDYtMjJUMTU6MDQ6NDEuNjAxWiIsInRva2VuX3R5cGUi',
      'Content-Type': 'application/json'
    };

    // Send the POST request
    axios.post(endpointURL, requestBody, { headers })
      .then(response => {
        console.log(response.data); // Output the response data
        res.json(response.data); // Send the response data to the client
      })
      .catch(error => {
        console.error(error); // Output any errors
        res.status(500).json({ error: 'Internal server error' }); // Send error response
      });
  } catch (error) {
    console.error(error); // Output any errors
    res.status(500).json({ error: 'Internal server error' }); // Send error response
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/vite-project/build')));

  app.get('*',(req,res) =>
res.sendFile(path.resolve(__dirname, '/vite-project', 'build', 'index.html')))
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
