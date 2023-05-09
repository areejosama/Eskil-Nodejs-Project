import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import { endpoint } from "./bundle.endpoint.js";
import { HME, filevalidation, mymulter } from "../../Services/multer.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as bundlerouter from './bundle.controller.js'

const router=Router();
router.post('/createbundle', auth(endpoint.Create), mymulter(filevalidation.image).single('image'), HME, asynchandler(bundlerouter.createbundle))
router.delete('/deletebundle/:bundleid', auth(endpoint.Delete), asynchandler(bundlerouter.deletebundle))
router.put('/updatebundle/:bundleid', auth(endpoint.Update), mymulter(filevalidation.image).single('image'), HME, asynchandler(bundlerouter.updateundle))
router.get('/allbundles', asynchandler(bundlerouter.getallbundles))
export default router;