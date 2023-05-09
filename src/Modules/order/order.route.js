import {Router} from 'express';
import { auth } from '../../Middleware/auth.js';
import { endpoint } from '../order/order.endpoint.js';
import { asynchandler } from '../../Middleware/errorhandler.js';
import * as orderrouter from './order.controller.js'

const router= Router();
router.post('/createorder', auth(endpoint.Create), asynchandler(orderrouter.createorder))
router.get('/vieworder', auth(endpoint.Get), asynchandler(orderrouter.vieworderdetails))
router.put('/updatequantity/:orderid', asynchandler(orderrouter.updatequantity))
export default router