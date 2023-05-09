import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import { endpoint } from "../cart/cart.endpoint.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as cartrouter from './cart.controller.js';

const router= Router();
router.post('/addtocart', auth(endpoint.Create), asynchandler(cartrouter.addtocart))
router.delete('/deletefromcart', auth(endpoint.Delete), asynchandler(cartrouter.deletefromcart))
router.get('/usercart', auth(endpoint.Get), asynchandler(cartrouter.getcart))
export default router