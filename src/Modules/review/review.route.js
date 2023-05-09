import {Router} from 'express';
import { auth } from '../../Middleware/auth.js';
import { endpoint } from '../review/review.endpoint.js';
import { asynchandler } from '../../Middleware/errorhandler.js';
import * as reviewrouter from './review.controller.js'

const router= Router({mergeParams:true});
router.post('/addreview', auth(endpoint.Add), asynchandler(reviewrouter.addreview))
router.get('/viewreviews', asynchandler(reviewrouter.getreviews))
export default router;