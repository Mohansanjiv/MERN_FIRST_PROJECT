const express = require("express");
const mongoose = require('mongoose');
const app = express();

const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ecom');
    const productSchema = new mongoose.Schema({});
    const product = mongoose.model('product', productSchema);
    const data = await product.find();
    console.log(data);
}

connectDB();
app.get('/', (req, res) => {
    res.send("<h1>server start</h1");
})

app.listen(5000);