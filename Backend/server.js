import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser Middleware
app.use(cookieParser());
app.use(cors());


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.get('/api/products', (req, res) => { // Fixed route path
    res.json(products);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
      // If product with the given id is not found, return a 404 status
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
