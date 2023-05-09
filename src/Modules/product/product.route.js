import { Router } from "express";
import { endpoint } from './../product/product.endpoint.js';
import { auth } from "../../Middleware/auth.js";
import { HME, filevalidation, mymulter } from "../../Services/multer.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as productrouter from './product.controller.js';
import  reviewrouter  from "../review/review.route.js";
import { check, validationResult } from 'express-validator';

const router= Router();
router.use('/:productid/review', reviewrouter)
router.post('/createproduct',
//[check('name', 'name is required').notEmpty()],(req,res)=>{
//     const errors= validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
// }
auth(endpoint.Create),mymulter(filevalidation.image).array('image',6), HME, asynchandler(productrouter.createproduct))
router.delete('/deleteproduct/:productid', auth(endpoint.Delete), asynchandler(productrouter.deleteproduct))
router.put('/updateproduct/:productid', auth(endpoint.Update), mymulter(filevalidation.image).array('image',6), HME, asynchandler(productrouter.updateproduct))
router.get('/allproducts', asynchandler(productrouter.getallproducts))
export default router;