const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors module

const app = express();
const PORT = 5000;

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use cors middleware
app.use(express.json());
app.use(cors());

// Define a simple product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/hello', (req, res) => {
  res.send('Your server started');
});

// Define a route to fetch products
app.get('/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    // Extract user data from req.body
  
    const { name, email, password } = req.body;

    // Create a new Product document
    const newUser = new Product({ name, email, password });
    console.log(newUser);
    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
