const express = require("express");
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const shortid = require("shortid");
const { response } = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 9696; 


app.listen(port, () => console.log(`serve at http://localhost:${port}`));


 app.use(express.urlencoded({ extended: true}))


 mongoose.connect("mongodb+srv://Windy:8Lhe9YTTCnZBzI2K@cluster0.kprsc.mongodb.net/test?retryWrites=true&w=majority", {
     useNewUrlParser: true,
     useCreateIndex: true, 
     useUnifiedTopology: true,
 });

 const Product = mongoose.model(
     "products", 
     new mongoose.Schema({
         id: { type: String, default: shortid.generate },
         title: String,
         type: [String],
         image: String,
         description: String,
         price: Number,
         stock: Number,
     })
 );

//creating new endpoints
//app.get("/api/products", async(req, res) => res.send('Hello!'))
 
app.get("/api/products", async (req, res) => {
 const products = await Product.find({});
 res.send(products);
 });

 app.post("/api/products", async(req, res) => {
     const newProduct = new Product(req.body);
     const savedProduct = await newProduct.save();
     res.send(savedProduct);
 });

 app.delete("/api/products/:id", async(req, res) => {
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
     res.send(deletedProduct);
 })
