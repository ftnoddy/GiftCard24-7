const express = require('express');
const { json } = require('express'); // Destructuring to extract `json` function
const products = require('./Data/Productes'); // Assuming `Productes` is a typo and should be `Products`
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json());

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
