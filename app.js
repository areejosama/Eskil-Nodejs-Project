import express from 'express';
import DBconnection from './DB/connection.js';
import * as dotenv from 'dotenv';
dotenv.config()
import * as indexrouter from './index.routes.js';
import bodyParser from "body-parser";
DBconnection();
const port = 3000
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1/auth', indexrouter.authrouter)
app.use('/api/v1/user', indexrouter.userrouter)
app.use('/api/v1/brand', indexrouter.brandrouter)
app.use('/api/v1/category', indexrouter.categoryrouter)
app.use('/api/v1/contact', indexrouter.contactrouter)
app.use('/api/v1/product', indexrouter.productrouter)
app.use('/api/v1/bundle', indexrouter.bundlerouter)
app.use('/api/v1/cart', indexrouter.cartrouter)
app.use('/api/v1/order', indexrouter.orderrouter)
app.use('*',(req,res)=>{res.status(404).json({message:'Page Not Found'})})

//global error handling 
app.use( (error, req, res, next)=>{
    if(error){
        return res.status(error['cause']).json({message:error.message, line:error.stack})
    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))