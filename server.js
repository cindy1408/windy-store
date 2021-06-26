const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const shortid = require("shortid");
const app = express();
//const stripe = require(stripe)('sk_test_51IzITeCp2VW1FwclE62hzANw1I2Suy2WSil8ziMrBbXIDc92O5NjTW11BjnhlYqYmxoqrO4PpT19rOV5ntrlxOHh008cUhK9tk')

app.use(express.json());

const allowedOrigins = ['http://localhost:5000'];

const corsOptions = {
     origin: allowedOrigins
 }

 app.use(cors(corsOptions));



const port = process.env.PORT || 5000; 


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


app.get("/api/products", async (req, res) => {
    res.json({msg: 'This is CORS-enabled for only example.com.'})
    const products = await Product.find({});
    res.send(products);
 });

 app.post("/api/products", async(req, res) => {
     const newProduct = new Product(req.body);
     const savedProduct = await newProduct.save();
     res.send(savedProduct);
 });

 app.post("/checkout", async(req, res) => {
     console.log("request", res.body);
     let error; 
     let status; 
     try{
         const {product, token} = req.body;

         const customer = await 
         stripe.customers.create({
             email: token.email,
             source: token.id
         });
         const idempotency_key = uuid();
         const charge = await stripe.charges.create({
             amount: product.price*100,
             currency: "gbp",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country, 
                    postal_code: token.card.address_zip
                }
            }
         }, 
         {
            idempotency_key
         }
         );
         console.log(`Charge:`, {charge});
         status: "success";
     } catch (error){
         console.error("Error: ", error);
         status: "failure"; 
     }
     res.json({error, status})
 });


 app.delete("/api/products/:id", async(req, res) => {
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
     res.send(deletedProduct);
 })

 const Order = mongoose.model('order', new mongoose.Schema(
     {
        _id: {
            type: String,
            default: shortid.generate
        }, 
    email: String,
    name: String, 
    address: String,
    total: Number,
    cartItems: [{
        _id: String, 
        title: String,
        price: Number, 
        count: Number
    },
    ],
    }, 
    {
        timestamps: true,
    }
));

app.post("/api/orders", async(req, res) => {
    if(
        !res.body.name || 
        !res.body.email ||
        !res.body.address ||
        !res.body.total ||
        !res.body.cartItems
        ){
            return res.send({message: "Data is required"});
        }
        const order = await Order(req.body).save();
        res.send(order);
})