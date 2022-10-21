const express = require("express");
var cors = require('cors')
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const shortid = require("shortid");
// const stripe = require(stripe)('sk_test_51IzITeCp2VW1FwclE62hzANw1I2Suy2WSil8ziMrBbXIDc92O5NjTW11BjnhlYqYmxoqrO4PpT19rOV5ntrlxOHh008cUhK9tk')
import cors from 'cors';
const app = express();

//Recognises the incoming Request Object as a JSON object, this is called as a middleware.. 
app.use(express.json());
app.options('*', cors());
const port = process.env.PORT || 5000; 


app.listen(port, () => console.log(`serve at http://localhost:${port}`));


app.use(cors); /* NEW */

app.use(express.json());
// app.use(cors())

app.post('/users', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  
  app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
  })

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});    


app.use(cors(options));


 app.use(express.urlencoded({ extended: true}))


 mongoose.connect("mongodb+srv://Windy:8Lhe9YTTCnZBzI2K@cluster0.kprsc.mongodb.net/test?retryWrites=true&w=majority", {
     useNewUrlParser: true,
     useCreateIndex: true, 
     useUnifiedTopology: true,
 });

 const Users = mongoose.model(
     "users",
     new mongoose.Schema({
         id: { type: String, default: shortid.generate },
         name: String, 
         email: String,
         password: String
     })
 )


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
 
app.get("/api/products", async (req, res) => {
 const products = await Product.find({});
//  res.send('Hello World')
 res.send(products);
 });

 //get user within the database 
 app.get("/api/users", async(req, res) => {
     const users = await Users.find({});
     res.send(users)
 })

 app.get('/secret', async (req, res) => {
    // const intent = fetch 
    res.json({client_secret: intent.client_secret});
  });


 app.post("/api/products", async(req, res) => {
     const newProduct = new Product(req.body);
     const savedProduct = await newProduct.save();
     res.send(savedProduct);
 });

 //saving a user in the database

 app.post("/api/users", async(req, res) => {
     const newUser = new Product(req.body);
     const savedUser = await newUser.save();
     res.send(savedUser);
 })

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
         console.log(`Charge: `, {charge});
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
