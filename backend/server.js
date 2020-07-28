import express from 'express';
import data from './data';
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose';
import bodyParsor from 'body-parser';
import userRoute from './routes/userRoutes';

dotenv.config();

const mongobdurl = config.MONGODB_URL;

mongoose.connect(mongobdurl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).catch(error => console.log(error.message));




const app = express();

app.use(bodyParsor.json())

app.use("/api/users",userRoute);
app.get("/api/product/:id",(req,res)=>{

    const productId =req.params.id;


    const product = data.products.find(x=>x._id == productId);
    if(product)
    {
        res.send(product);
    }
   else
        res.status(404).send({msg: "Product not found."});

})

app.get("/api/products",(req,res)=>{

    res.send(data.products);
})

app.listen(5000, ()=>{
    console.log("server started listening at http://localhost:5000")
})