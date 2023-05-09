import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import { endpoint } from "./brand.endpoint.js";
import { filevalidation, HME, mymulter  } from "../../Services/multer.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as brandrouter from './brand.controller.js'
import { validation } from "../../Middleware/validation.js";
import { deletebrand, updatebrand } from "./brand.validation.js";

const router= Router();
router.post('/createbrand',auth(endpoint.Add),mymulter(filevalidation.image).single('image'),HME, asynchandler(brandrouter.createbrand))
router.delete('/deletebrand/:brandid',validation(deletebrand),auth(endpoint.Delete),asynchandler(brandrouter.deletebrand))
router.put('/updatedbrand/:brandid',validation(updatebrand),auth(endpoint.Update), mymulter(filevalidation.image).single('image'), HME,asynchandler(brandrouter.updatebrand))
router.get('/allbrands',asynchandler(brandrouter.getallbrands))
export default router;